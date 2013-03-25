// Ve API Script 1.0


// Videncode API
var Videncode = (function () {

	// Variables
	var signature = ".ve.snd\0";



	/**
		Constructor method.

		@return
			new Videncode object
	*/
	function ve() {
		// Initial state
		this.data_blob = null;
		this.reset();
	}

	// Private methods
	var this_private = {

		/**
			Keep a string to be less than maxLen characters when encoded as UTF-8.

			@param str
				the string to modify
			@param maxLen
				the maximum length of the string when encoded in UTF-8
			@return
				the string updated to be within maxLen's length range
		*/
		adjust_utf8_string_length: function (str, maxLen) {
			var utf8_str = unescape(encodeURIComponent(str));

			if (utf8_str.length > maxLen) {
				var loop = true;
				var newStr = "";
				while (loop && maxLen >= 0) {
					loop = false;
					try {
						newStr = decodeURIComponent(escape(utf8_str.substr(0, maxLen)));
					}
					catch (e) {
						--maxLen;
						loop = true;
					}
				}

				return newStr;
			}

			return str;
		},

		/**
			Set the error message if it is not set.

			@param message
				a string containing an error message
			@return
				this
		*/
		set_error: function (message) {
			// Set
			if (this.error_message === null) {
				this.error_message = message;
			}

			return this;
		},

		/**
			Get the number of bytes required to store a varlen int.

			@param value
				the value to be stored
			@param maxLen
				the maximum number of bytes
			@return
				the number of bytes needed
		*/
		get_varlen_int_length: function (value, maxLen) {
			var i = 0;
			for (; i < maxLen; ++i) {
				value = value >>> 7;
				if (value == 0) return i + 1;
			}
			return i;
		},

		/**
			Convert an integer to a varlen int, stored in a Uint8Array.

			@param value
				the value to be stored
			@param bytes
				a Uint8Array which will contain the result;
				it's length is used as the max length
			@return
				the number of bytes useds
		*/
		int_to_varlen_bytes: function (value, bytes) {
			var i = 0;
			for (; i < bytes.length; ++i) {
				if (i > 0) bytes[i - 1] |= 0x80;

				bytes[i] = (value & 0x7F);
				value = value >>> 7;
				if (value == 0) return i + 1;
			}
			return i;
		},

		/**
			Convert a string to a Uint8Array.
			Note that this does not do any UTF-8 conversion, that has to be
			done beforehand.

			@param str
				the string to convert
			@return
				a new Uint8Array containing the string
		*/
		string_to_bytes: function (str) {
			var bytes = new Uint8Array(new ArrayBuffer(str.length))
			for (var i = 0; i < str.length; ++i) bytes[i] = str.charCodeAt(i);
			return bytes;
		},

		/**
			Mask a single byte and return its new value.
			If masking is disabled, this does nothing and returns the input.

			@param b
				the byte to mask
			@return
				the masked byte
		*/
		mask_byte: function (b) {
			if (!this.mask_file) return b;

			this.mask_value = (this.mask_value * 102293 + 390843) & 0xFFFFFFFF;
			this.mask = this.mask_value >>> 24;
			this.mask_value += b;
			return (b ^ this.mask);
		},

		/**
			Update the mask with a sequence of bytes.

			@param bytes
				a Uint8Array of byte values
			@param length
				the number of bytes to update the mask with
		*/
		mask_modify_from_bytes: function (bytes, length) {
			if (!this.mask_file) return;

			for (var i = 0; i < length; ++i) {
				this.mask_value = (this.mask_value * 102293 + 390843) & 0xFFFFFFFF;
				this.mask = this.mask_value >>> 24;
				this.mask_value += ((bytes[i] & 0xFF) ^ this.mask);
			}
		}

	};

	// Public Methods
	ve.prototype = {

		constructor: ve,

		/**
			Reset the state of the object.

			@return
				this
		*/
		reset: function () {
			this.error_message = null;

			this.video = null;
			this.audio = null;
			this.image = null;
			this.image_mime = "";

			this.sync_offset = 0.0;

			this.video_fades = [ false , false ];
			this.audio_fades = [ false , false ];

			this.video_play_style = [ 0 , 0 ];
			this.audio_play_style = [ 0 , 0 ];

			this.output_data = null;
			if (this.data_blob != null) {
				this.data_blob = null;
				(window.webkitURL || window.URL).revokeObjectURL(this.data_blob_url);
			}
			this.data_blob_url = null;

			this.mask_file = true;
			this.mask = 0x12;
			this.mask_value = 0xABCDEF;

			return this;
		},

		/**
			Encode the given settings into a new file. To check if this succeeded,
			use has_error() after the call.

			@return
				this
		*/
		encode: function () {
			// Check
			if (this.error_message !== null || this.output_data !== null) {
				this_private.set_error.call(this, "Not reset");
				return this;
			}
			if (this.image == null) {
				this_private.set_error.call(this, "No image");
				return this;
			}
			if (this.video == null && this.audio == null) {
				this_private.set_error.call(this, "No video or audio");
				return this;
			}

			// Signature
			var signature_array = this_private.string_to_bytes.call(this, signature);

			// UTF-8 tag
			var utf8_tag = (this.tag == null ? "" : this_private.adjust_utf8_string_length.call(this, this.tag, 100));
			utf8_tag = unescape(encodeURIComponent(utf8_tag));
			var utf8_tag_array = this_private.string_to_bytes.call(this, utf8_tag);

			// Sync offset
			var sync_int = Math.floor(this.sync_offset);
			var sync_dec = this.sync_offset - sync_int;

			// Temp
			var temp = Uint8Array(new ArrayBuffer(5));
			var has_both = (this.video != null && this.audio != null);

			// Calculate size requirements
			var size = this.image.length + // image
				signature_array.length + // signature
				1 + // version
				1 + // flags1
				(has_both ? 1 : 0) + // flags2
				this_private.get_varlen_int_length.call(this, utf8_tag_array.length, 5) + // tag length
				utf8_tag_array.length + // tag
				(has_both ? this_private.get_varlen_int_length.call(this, sync_int, 5) + 2 : 0) + // sync offset
				(this.video != null ? this_private.get_varlen_int_length.call(this, this.video.length, 5) : 0) + // video length
				(this.video != null ? this.video.length : 0) + // video
				(this.audio != null ? this_private.get_varlen_int_length.call(this, this.audio.length, 5) : 0) + // audio length
				(this.audio != null ? this.audio.length : 0); // audio

			// Create new
			this.output_data = Uint8Array(new ArrayBuffer(size));

			// Copy image
			var pos = 0;
			this_private.mask_modify_from_bytes.call(this, this.image, this.image.length);
			for (; pos < this.image.length; ++pos) {
				this.output_data[pos] = this.image[pos];
			}

			// Signature
			for (var i = 0; i < signature_array.length; ++i) {
				this.output_data[pos] = this_private.mask_byte.call(this, signature_array[i]);
				++pos;
			}

			// Version
			temp[0] = 1;
			this.output_data[pos++] = this_private.mask_byte.call(this, temp[0]);

			// Flags1
			temp[0] = (
				(this.video != null ? 0x01 : 0x00) |
				(this.audio != null ? 0x02 : 0x00) |
				// 0x04 : reserved
				// 0x08 : reserved
				(has_both && this.video_fades[0] ? 0x10 : 0x00) |
				(has_both && this.video_fades[1] ? 0x20 : 0x00) |
				(has_both && this.audio_fades[0] ? 0x40 : 0x00) |
				(has_both && this.audio_fades[1] ? 0x80 : 0x00)
			);
			this.output_data[pos++] = this_private.mask_byte.call(this, temp[0]);

			// Flags2
			if (has_both) {
				temp[0] = (
					(this.video_play_style[0] & 0x03) | // 0x01 , 0x02
					((this.video_play_style[1] & 0x03) << 2) | // 0x04 , 0x08
					((this.audio_play_style[0] & 0x01) << 4) | // 0x10
					((this.audio_play_style[0] & 0x01) << 5) // 0x20
					// 0x40 : reserved
					// 0x80 : reserved
				);
				this.output_data[pos++] = this_private.mask_byte.call(this, temp[0]);
			}

			// Tag
			var len = this_private.int_to_varlen_bytes.call(this, utf8_tag_array.length, temp);
			for (var i = 0; i < len; ++i) {
				this.output_data[pos++] = this_private.mask_byte.call(this, temp[i]);
			}
			for (var i = 0; i < utf8_tag_array.length; ++i) {
				this.output_data[pos++] = this_private.mask_byte.call(this, utf8_tag_array[i]);
			}

			// Sync offset
			if (has_both) {
				len = this_private.int_to_varlen_bytes.call(this, sync_int, temp);
				for (var i = 0; i < len; ++i) {
					this.output_data[pos++] = this_private.mask_byte.call(this, temp[i]);
				}

				len = 2;
				for (var i = 0; i < len; ++i) {
					temp[i] = 0;
					for (var j = 0; j < 8; ++j) {
						if ((sync_dec *= 2) >= 1.0) {
							sync_dec -= 1.0;
							temp[i] |= (1 << j);
						}
					}
				}
				for (var i = 0; i < len; ++i) {
					this.output_data[pos++] = this_private.mask_byte.call(this, temp[i]);
				}
			}

			// Video
			if (this.video != null) {
				len = this_private.int_to_varlen_bytes.call(this, this.video.length, temp);
				for (var i = 0; i < len; ++i) {
					this.output_data[pos++] = this_private.mask_byte.call(this, temp[i]);
				}

				len = this.video.length;
				for (var i = 0; i < len; ++i) {
					this.output_data[pos++] = this_private.mask_byte.call(this, this.video[i]);
				}
			}

			// Audio
			if (this.audio != null) {
				len = this_private.int_to_varlen_bytes.call(this, this.audio.length, temp);
				for (var i = 0; i < len; ++i) {
					this.output_data[pos++] = this_private.mask_byte.call(this, temp[i]);
				}

				len = this.audio.length;
				for (var i = 0; i < len; ++i) {
					this.output_data[pos++] = this_private.mask_byte.call(this, this.audio[i]);
				}
			}

			// Done
			return this;
		},

		/**
			Get the byte array of the final image.

			@return
				null if the encoding wasn't completed
				otherwise, a Uint8Array of the data
		*/
		get_data: function () {
			return this.output_data;
		},

		/**
			Get a usable blob URL from the generated data.

			@return
				null if the encoding wasn't completed
				otherwise, a string containing a URL
		*/
		get_url: function () {
			if (this.output_data != null) {
				if (this.data_blob == null) {
					this.data_blob = new Blob([ this.output_data ], {type: this.image_mime});
					this.data_blob_url = (window.webkitURL || window.URL).createObjectURL(this.data_blob);
				}

				return this.data_blob_url;
			}

			return null;
		},

		/**
			Get the mime type of the original image.

			@return
				whatever was passed into set_image();
				presumably one of "image/jpeg", "image/png", or "image/gif"
		*/
		get_image_mime_type: function () {
			return this.image_mime;
		},

		/**
			Get the error message.

			@return
				a string containing the error message, or null if no error
		*/
		get_error: function () {
			// Get
			return (this.error_message !== null ? this.error_message : (this.output_data === null ? "Not encoded" : null));
		},

		/**
			Check if there was an error.

			@return
				true if there was an error, false otherwise
		*/
		has_error: function () {
			return (this.error_message !== null || this.output_data === null);
		},

		/**
			Set the video data for the object.

			@param video
				a Uint8Array of the video data
			@return
				this
		*/
		set_video: function (video) {
			this.video = video;

			return this;
		},

		/**
			Set the audio data for the object.

			@param audio
				a Uint8Array of the audio data
			@return
				this
		*/
		set_audio: function (audio) {
			this.audio = audio

			return this;
		},

		/**
			Set the image data for the object.

			@param image
				a Uint8Array of the image data
			@param mime_type
				a string of the mime type of the image
			@return
				this
		*/
		set_image: function (image, mime_type) {
			this.image = image;
			this.image_mime = mime_type;

			return this;
		},

		/**
			Set tag for the object.

			@param tag
				a string of the tag
			@return
				this
		*/
		set_tag: function (tag) {
			this.tag = tag;

			return this;
		},

		/**
			Set the method the video should play with.
			This is only meaningful if the video and audio are separate.
			Current values are:
				0: display blank when the video isn't playing
				1: loop the video
				2: display the video frame when the video isn't playing
				3: display the image when the video isn't playing

			@param start
				true if the method should be applied to the start of playback, false otherwise
			@param style
				one of the above values
			@return
				this
		*/
		set_video_play_style: function (start, style) {
			if (style !== 0 && style !== 1 && style !== 2 && style !== 3) style = 0;

			this.video_play_style[start ? 0 : 1] = style;

			return this;
		},

		/**
			Set the method the audio should play with.
			This is only meaningful if the video and audio are separate.
			Current values are:
				0: play nothing
				1: loop the audio

			@param start
				true if the method should be applied to the start of playback, false otherwise
			@param style
				one of the above values
			@return
				this
		*/
		set_audio_play_style: function (start, style) {
			if (style !== 0 && style !== 1) style = 0;

			this.audio_play_style[start ? 0 : 1] = style;

			return this;
		},

		/**
			Set if the video should fade in/out or not.
			This is only meaningful if the video and audio are separate.

			@param start
				true if the fade should be applied to the start of playback, false otherwise
			@param enabled
				true if a fade should occur, false otherwise
			@return
				this
		*/
		set_video_fade: function (start, enabled) {
			this.video_fades[start ? 0 : 1] = enabled;

			return this;
		},

		/**
			Set if the audio should fade in/out or not.
			This is only meaningful if the video and audio are separate.

			@param start
				true if the fade should be applied to the start of playback, false otherwise
			@param enabled
				true if a fade should occur, false otherwise
			@return
				this
		*/
		set_audio_fade: function (start, enabled) {
			this.audio_fades[start ? 0 : 1] = enabled;

			return this;
		},

		/**
			Set the sync offset of the shorter track.
			This is only meaningful if the video and audio are separate.

			@param offset
				the offset in seconds
			@return
				this
		*/
		set_sync_offset: function (offset) {
			this.sync_offset = offset;

			return this;
		}

	};

	// Return
	return ve;

})();


// Videcode API
var Videcode = (function () {

	// Variables
	var signature = ".ve.snd\0";
	var signature_array = new Uint8Array(new ArrayBuffer(signature.length));
	for (i = 0; i < signature.length; ++i) signature_array[i] = signature.charCodeAt(i);



	/**
		Constructor method.

		@param source
			a Uint8Array of the full image
		@param filename
			the name of the original file
		@return
			new Videcode object
	*/
	function ve(source, filename) {
		// Set vars
		this.source = source;
		this.filename = filename;
		var ext = filename.split(".").pop().toLowerCase();
		if (ext == "png") this.mime = "image/png";
		else if (ext == "gif") this.mime = "image/gif";
		else this.mime = "image/jpeg"

		// Status
		this.reset();
	}

	// Private methods
	var this_private = {

		/**
			Update the mask state with a single byte value.

			@param b
				the byte value
			@return
				the unmasked byte
		*/
		mask_update: function (b) {
			// Mask update
			this.mask_value = (this.mask_value * 102293 + 390843) & 0xFFFFFFFF;
			this.mask = this.mask_value >>> 24;
			b = (b ^ this.mask);
			this.mask_value += b;

			// Return unmasked value
			return b;
		},

		/**
			Update the mask state with a single byte value.
			A checking version which returns -1 if the end of the file
			has been reached and will modify the error message.

			@param b
				the byte value
			@return
				the unmasked byte, or -1 if at EOF
		*/
		mask_update_checked: function (b) {
			// Check for undefined
			if (b === undefined) {
				this_private.set_error.call(this, "End of file");
				return -1;
			}

			// Mask update
			this.mask_value = (this.mask_value * 102293 + 390843) & 0xFFFFFFFF;
			this.mask = this.mask_value >>> 24;
			b = (b ^ this.mask);
			this.mask_value += b;

			// Return unmasked value
			return b;
		},

		/**
			Read a variable-byte-length integer from the source.
			On failure, the error message will be modified.

			@param start
				the position of the first byte
			@param maxlen
				the maximum number of bytes that can make up the number
			@return
				null on failure,
				[ value , count ] on success, where
					value is the retrieved integer value,
					count is the number of bytes read
		*/
		read_varlen_int: function (start, maxlen) {
			var value = 0;
			var i = 0, b;

			// Read
			for (; i < maxlen; ++i) {
				value = value | ((b = this_private.mask_update_checked.call(this, this.source[start + i])) & 0x7F) << (7 * i);
				if (b < 0) {
					// End of stream
					return null;
				}
				if ((b & 0x80) == 0) break;
			}

			// Bad format
			if (i == maxlen) {
				this_private.set_error.call(this, "Bad number format");
				return null;
			}

			// Okay
			return [ value , i + 1 ];
		},

		/**
			Set the error message if it is not set.

			@param message
				a string containing an error message
			@return
				this
		*/
		set_error: function (message) {
			// Set
			if (this.error_message === null) {
				this.error_message = message;
				this.malformed = true;
			}

			return this;
		}

	};

	// Public Methods
	ve.prototype = {

		constructor: ve,

		/**
			Reset the state of the object.

			@return
				this
		*/
		reset: function () {
			// Decoding data
			this.version = 0;

			this.malformed = false;
			this.error_message = null;
			this.status = 0;
			this.mask = 0x12;
			this.mask_value = 0xABCDEF;

			this.data_offset = 0;

			this.tag = "";
			this.sync_offset = 0;

			this.multiplexed = false;
			this.video_is_longer = false;

			this.video = null;
			this.audio = null;
			this.image = null;

			this.video_fades = [ false , false ];
			this.audio_fades = [ false , false ];

			this.video_play_style = [ 0 , 0 ];
			this.audio_play_style = [ 0 , 0 ];

			return this;
		},

		/**
			Decode the source image; image is guaranteed to be decoded on return.

			@return
				this
		*/
		decode: function () {
			// Reset
			this.reset();

			// Setup
			var pos = 0;
			var len = this.source.length;
			var b, i;

			// Find signature
			for (i = 0; i < len; ++i) {
				b = this_private.mask_update.call(this, this.source[i]);

				if (b == signature_array[pos]) {
					// Found
					if (++pos >= signature_array.length) {
						++i;
						this.data_offset = i - signature_array.length;
						break;
					}
				}
				else {
					// Reset
					pos = 0;
				}
			}

			// Signature found
			if (i < len) {
				// Status update
				this.status = 1;

				// Version
				this.version = this_private.mask_update_checked.call(this, this.source[i++]);

				// Flags1
				var flags1 = this_private.mask_update_checked.call(this, this.source[i++]);
				this.multiplexed = ((flags1 & 0x04) != 0);
				this.video_fades[0] = ((flags1 & 0x10) != 0);
				this.video_fades[1] = ((flags1 & 0x20) != 0);
				this.audio_fades[0] = ((flags1 & 0x40) != 0);
				this.audio_fades[1] = ((flags1 & 0x80) != 0);

				// Flags2
				var flags2 = 0;
				if ((flags1 & 0x03) == 0x03) {
					flags2 = this_private.mask_update_checked.call(this, this.source[i++]);
					this.video_play_style[0] = (flags2 & 0x03);
					this.video_play_style[1] = (flags2 & 0x0C) >> 2;
					this.audio_play_style[0] = (flags2 & 0x10) >> 4;
					this.audio_play_style[1] = (flags2 & 0x20) >> 5;
					this.video_is_longer = ((flags2 & 0x40) != 0);
				}

				// Var-length tag
				var data = this_private.read_varlen_int.call(this, i, 5);
				if (data !== null) {
					i += data[1];
					var tag_length = data[0];

					// Tag
					if (tag_length + i <= this.source.length) {
						len = i + tag_length;

						for (; i < len; ++i) {
							this.tag += String.fromCharCode(this_private.mask_update.call(this, this.source[i]));
						}

						// Decode UTF-8
						try {
							this.tag = decodeURIComponent(escape(this.tag));
						}
						catch (e) {}
					}
					else {
						// Error
						this_private.set_error.call(this, "End of file");
					}
				}

				// Sync offsets
				if ((flags1 & 0x03) == 0x03 && this.error_message === null) {
					// Integer part
					var data = this_private.read_varlen_int.call(this, i, 5);
					if (data != null) {
						i += data[1];
						this.sync_offset = data[0];

						// Decimal part
						var dec = [ 0 , 0 ];
						var dec_val = 0.5;
						var fraction = 0.0;
						dec[0] = this_private.mask_update_checked.call(this, this.source[i++]);
						dec[1] = this_private.mask_update_checked.call(this, this.source[i++]);

						for (var j = 0; j < dec.length; ++j) {
							for (var k = 0; k < 8; ++k) {
								if ((dec[j] & (1 << k)) != 0) fraction += dec_val;
								dec_val /= 2.0;
							}
						}

						this.sync_offset += fraction;
					}
				}

				// Video
				if ((flags1 & 0x01) != 0 && this.error_message === null) {
					data = this_private.read_varlen_int.call(this, i, 5);
					if (data !== null) {
						i += data[1];
						var video_length = data[0];

						// Video data
						if (video_length + i <= this.source.length) {
							len = i + video_length;
							this.video = new Uint8Array(new ArrayBuffer(video_length));

							var j = 0;
							for (; i < len; ++i) {
								this.video[j++] = this_private.mask_update.call(this, this.source[i]);
							}
						}
						else {
							// Error
							this_private.set_error.call(this, "End of file");
						}
					}
				}

				// Audio
				if ((flags1 & 0x02) != 0 && this.error_message === null) {
					data = this_private.read_varlen_int.call(this, i, 5);
					if (data !== null) {
						i += data[1];
						var audio_length = data[0];

						// Video data
						if (audio_length + i <= this.source.length) {
							len = i + audio_length;
							this.audio = new Uint8Array(new ArrayBuffer(audio_length));

							var j = 0;
							for (; i < len; ++i) {
								this.audio[j++] = this_private.mask_update.call(this, this.source[i]);
							}
						}
						else {
							// Error
							this_private.set_error.call(this, "End of file");
						}
					}
				}

				// Image
				this.image = this.source.subarray(0, this.data_offset);
			}
			else {
				this_private.set_error.call(this, "No data found");
				this.malformed = false;
			}

			// Error
			if (this.error_message !== null) {
				this.video = null;
				this.audio = null;
				this.image = null;
			}

			// Done
			return this;
		},

		/**
			Get the error message.

			@return
				a string containing the error message, or null if no error
		*/
		get_error: function () {
			// Get
			return (this.error_message !== null ? this.error_message : (this.image === null ? "Not decoded" : null));
		},

		/**
			Check if there was an error.

			@return
				true if there was an error, false otherwise
		*/
		has_error: function () {
			return (this.error_message !== null || this.image === null);
		},

		/**
			Check if the decoded data was malformed.

			@return
				true if not decoded or not malformed,
				false if an error occured that wasn't "no data found"
		*/
		is_malformed: function () {
			return this.malformed;
		},

		/**
			Check if this object has video.

			@return
				true if it has video data, false otherwise
		*/
		has_video: function () {
			return (this.video != null);
		},

		/**
			Check if this object has separate audio.
			This will return false if the audio is multiplexed into the video.

			@return
				true if it has separate audio data, false otherwise
		*/
		has_audio: function () {
			return (this.multiplexed || this.audio != null);
		},

		/**
			Check if this object has audio and video multiplexed together.

			@return
				true if it has audio and video multiplexed together, false otherwise
		*/
		is_muxed: function () {
			return this.multiplexed;
		},

		/**
			Get the video data.

			@return
				null if there is no video,
				otherwise, a Uint8Array of the video file
		*/
		get_video: function () {
			return this.video;
		},

		/**
			Get the separate audio data.

			@return
				null if there is no separate audio,
				otherwise, a Uint8Array of the audio file
		*/
		get_audio: function () {
			return this.audio;
		},

		/**
			Get the image data.

			@return
				a Uint8Array of the image file
		*/
		get_image: function () {
			return this.image;
		},

		/**
			Get the source data.

			@return
				a Uint8Array of the source file
		*/
		get_source: function () {
			return this.source;
		},

		/**
			Returns the file tag.

			@return
				a string containing the tag
		*/
		get_tag: function () {
			return this.tag;
		},

		/**
			Returns the synchronization offset.

			@return
				a number in seconds of the offset
		*/
		get_sync_offset: function () {
			return this.sync_offset;
		},

		/**
			Get the mime type of the original image.

			@return
				either "image/jpeg", "image/png", or "image/gif"
		*/
		get_image_mime_type: function () {
			return this.mime;
		},

		/**
			Return if video fading is enabled for the checked value.
			This is only meaningful if the video and audio are separate.

			@param start
				true if checking when the video starts playing, false if checking at the end
			@return
				true if enabled, false otherwise
		*/
		get_video_fade: function (start) {
			return (this.video_fades[start ? 0 : 1]);
		},

		/**
			Return if audio fading is enabled for the checked value.
			This is only meaningful if the video and audio are separate.

			@param start
				true if checking when the audio starts playing, false if checking at the end
			@return
				true if enabled, false otherwise
		*/
		get_audio_fade: function (start) {
			return (this.audio_fades[start ? 0 : 1]);
		},

		/**
			Returns the method the video should play with.
			This is only meaningful if the video and audio are separate.
			Current values are:
				0: display blank when the video isn't playing
				1: loop the video
				2: display the video frame when the video isn't playing
				3: display the image when the video isn't playing

			@param start
				true if checking when the video starts playing, false if checking at the end
			@return
				one of the above values
		*/
		get_video_play_style: function (start) {
			return (this.video_play_style[start ? 0 : 1]);
		},

		/**
			Returns the method the audio should play with.
			This is only meaningful if the video and audio are separate.
			Current values are:
				0: play nothing
				1: loop the audio

			@param start
				true if checking when the audio starts playing, false if checking at the end
			@return
				one of the above values
		*/
		get_audio_play_style: function (start) {
			return (this.audio_play_style[start ? 0 : 1]);
		},

		/**
			Check if the object has both audio and video.

			@return
				true if it has both, false otherwise
		*/
		has_video_and_audio: function () {
			return (this.audio != null && this.video != null);
		}

	};

	// Return
	return ve;

})();


// Playback API
var VPlayer = (function () {

	// Helper functions
	function add_css_rule(rule) {
		/**
			Add a CSS rule to the document.

			@param rule
				the single rule to add
		*/
		if (document.styleSheets && document.styleSheets.length) {
			try {
				document.styleSheets[0].insertRule(rule, 0);
			}
			catch (e) {}
		}
		else {
			var style = document.createElement("style");
			style.innerHTML = rule;
			document.head.appendChild(style);
		}
	}
	function create_animation(css, ms_time, method) {
		/**
			Create a CSS animation.

			@param css
				an object of key-value pairs of the targeted animation
			@param ms_time
				the time in milliseconds
			@param method
				the CSS animation method
			@return
				the class name of the animation
		*/
		if (ms_time === undefined) {
			ms_time = 500;
		}
		if (method === undefined) {
			method = "linear";
		}

		// Build styles
		var class_name = css_animation_prefix + "Class" + css_animation_id;
		var animation_name = css_animation_prefix + (css_animation_id++);

		var style = "";
		for (var key in css) {
			style += key + ":" + css[key] + ";";
		}

		// Animation
		var stylesheet;
		for (var i = 0; i < css_prefixes.length; ++i) {
			stylesheet = "@" + css_prefixes[i] + "keyframes " + animation_name + " {\n" +
					"from{}\n" +
					"to{" + style + "}\n" +
					"}\n";
			add_css_rule(stylesheet);
		}

		// Class
		style = animation_name + " " + ms_time + "ms " + method;
		for (var i = 0; i < css_prefixes.length; ++i) {
			stylesheet += css_prefixes[i] + "animation:" + style + ";"
		}
		add_css_rule("." + class_name + "{\n" + stylesheet + "}\n");

		// Okay
		return class_name;
	}
	function has_class(class_list, check) {
		/**
			Check if a class list has a certain class in it.

			@param class_list
				the class list to check
			@param check
				the class to find
			@return
				true if found, false otherwise
		*/
		return (class_list.match(new RegExp("(\\s|^)" + check + "(\\s|$)", "g")) != null);
	}
	function remove_class(class_list, remove) {
		/**
			Remove a class from a class list.

			@param class_list
				the class list to use
			@param remove
				the class to remove
			@return
				the class list with the class removed
		*/
		return class_list.replace(new RegExp("(\\s|^)" + remove + "(\\s|$)", "g"), " ");
	}
	function add_class(class_list, add) {
		/**
			Add a class to a class list.

			@param class_list
				the class list to use
			@param add
				the class to add
			@return
				the class list with the class added
		*/
		return class_list + " " + add;
	}
	function set_animation_time(elem, ms_time) {
		/**
			Sets the animation duration of an element.

			@param elem
				the DOM element to modify
			@param ms_time
				the time in milliseconds
		*/
		var str = "animation-duration:" + ms_time + "ms;";
		str += "-webkit-animation-duration:" + ms_time + "ms;";
		elem.setAttribute("style", elem.getAttribute("style") + str);
	}
	function clear_animation_time(elem) {
		/**
			Clears the animation duration of an element.

			@param elem
				the DOM element to modify
		*/
		clear_animation_time_single(elem, "animationDuration");
		clear_animation_time_single(elem, "webkitAnimationDuration");
		clear_animation_time_single(elem, "animation");
		clear_animation_time_single(elem, "webkitAnimation");
	}
	function clear_animation_time_single(elem, name) {
		/**
			Clears the animation duration of an element.

			@param elem
				the DOM element to modify
			@param name
				the style name to clear
		*/
		try {
			elem.style[name] = "";
		}
		catch (e) {}
	}
	function init_once() {
		/**
			A function to be called only once before VPlayer's can be used.
			Sets some stuff up.
		*/
		if (css_video_opacity_animations != null) return;

		css_video_opacity_animations = [
			create_animation({ "opacity": "1.0" }),
			create_animation({ "opacity": "0.0" })
		];
	}
	function get_computed_style(elem) {
		/**
			Get the computed style of an object.

			@return
				the computed style
		*/
		return window.getComputedStyle(elem, null);
	}

	// Variables
	var css_animation_prefix = "VeAPIVPlayerAnimation";

	// Variables
	var function_type = typeof(function(){});
	var css_animation_id = 0;
	var css_prefixes = [ "" , "-o-" , "-moz-" , "-webkit-" ];
	var css_video_opacity_animations = null;
	var DISPLAY_NOTHING = 0;
	var DISPLAY_LOOPED = 1;
	var DISPLAY_VIDEO = 2;
	var DISPLAY_IMAGE = 3;
	var PLAY_NOTHING = 0;
	var PLAY_LOOPED = 1;



	/**
		Constructor method.

		@param [videcode]
			a Videcode object which has been properly initialized
			if omitted, gen_data must be called later with a Videcode object
		@return
			new VPlayer object
	*/
	function vp(videcode) {
		// Init
		init_once();

		// Set vars
		this.videcode = (videcode === undefined ? null : videcode);

		// Animation data
		this.video_animation_time = [ 1.0 , 1.0 ]; // seconds
		this.audio_animation_time = [ 1.0 , 1.0 ]; // seconds
		this.audio_animation_interval = 50; // ms

		this.video_desync_max = 0.25; // seconds
		this.audio_desync_max = 0.25; // seconds

		// Playback data
		this.clear_listeners();

		// Create data
		this.sync_timer = null;
		this.video_animate_timer = null;
		this.video_loop_remove_timer = null;
		this.video_loop_stop_timer = null;
		this.audio_animate_timer = null;
		this.audio_loop_remove_timer = null;
		this.audio_loop_stop_timer = null;

		this.element_container = null;
		this.video_tag = null;
		this.audio_tag = null;
		this.image_tag = null;
		this.video_callbacks = [];
		this.audio_callbacks = [];
		this.image_callbacks = [];

		this.video_blob = null;
		this.video_blob_url = null;
		this.audio_blob = null;
		this.audio_blob_url = null;
		this.image_blob = null;
		this.image_blob_url = null;

		this.gen_data();
	}

	// Private methods
	var this_private = {

		/**
			Triggers an event.

			@param event_name
				the string name of the event
			@param data
				an object containing data to be passed to the event callbacks
		*/
		trigger: function (event_name, data) {
			var listeners = this.event_listeners[event_name];
			if (listeners && listeners.length > 0) {
				for (var i = 0; i < listeners.length; ++i) {
					listeners[i].call(this, data);
				}
			}
		},

		/**
			Clear all timers related to playback.
		*/
		clear_timers: function () {
			if (this.sync_timer != null) {
				clearTimeout(this.sync_timer);
				this.sync_timer = null;
			}

			if (this.video_animate_timer != null) {
				clearTimeout(this.video_animate_timer);
				this.video_animate_timer = null;
			}
			if (this.video_loop_remove_timer != null) {
				clearTimeout(this.video_loop_remove_timer);
				this.video_loop_remove_timer = null;

				clearTimeout(this.video_loop_stop_timer);
				this.video_loop_stop_timer = null;
			}
			else if (this.video_loop_stop_timer != null) {
				clearTimeout(this.video_loop_stop_timer);
				this.video_loop_stop_timer = null;
			}

			if (this.audio_animate_timer != null) {
				clearTimeout(this.audio_animate_timer);
				this.audio_animate_timer = null;
			}
			if (this.audio_loop_remove_timer != null) {
				clearTimeout(this.audio_loop_remove_timer);
				this.audio_loop_remove_timer = null;

				clearTimeout(this.audio_loop_stop_timer);
				this.audio_loop_stop_timer = null;
			}
			else if (this.audio_loop_stop_timer != null) {
				clearTimeout(this.audio_loop_stop_timer);
				this.audio_loop_stop_timer = null;
			}
		},

		/**
			Internal way of playing and synchronizing separate audio/video tracks.
			Handles all the methods of playback.
		*/
		play_synced: function () {
			var self = this;

			if (this.video_main) {
				// Get the current time
				var current_time = this.video_tag.currentTime;
				if (current_time >= this.max_duration) {
					// Reset
					this.video_tag.currentTime = 0.0;
					current_time = 0.0;
				}


				// Animation
				var v = this_private.get_audio_volume_at_time.call(this, current_time);
				this.audio_tag.volume = this.volume * v;
				var min_time = (this.audio_play_style[0] == PLAY_LOOPED ? 0.0 : this.sync_offset);
				var max_time = (this.audio_play_style[1] == PLAY_LOOPED ? this.max_duration : this.sync_offset + this.min_duration);

				if (current_time >= this.sync_offset) {
					if (current_time < this.sync_offset + this.min_duration) {
						// Volume fade in/out
						var b = (v == 1.0);
						if (!b && !this.audio_fades[0]) b = true; // start fade not enabled
						if (!b || this.audio_fades[1]) { // fade must be enabled
							this.audio_animate_timer = setTimeout(function() {
								this_private.on_audio_animate.call(self);
							}, (b ? (this.sync_offset + this.min_duration - this.audio_animation_time[1]) - current_time : this.audio_animation_interval));
						}
					}
				}
				else {
					if (this.audio_fades[0]) {
						// Volume fade in
						this.audio_animate_timer = setTimeout(function() {
							this_private.on_audio_animate.call(self);
						}, this.sync_offset - current_time);
					}
					else if (this.audio_fades[1]) {
						// Volume fade out
						this.audio_animate_timer = setTimeout(function() {
							this_private.on_audio_animate.call(self);
						}, (this.sync_offset + this.min_duration - this.audio_animation_time[1]) - current_time);
					}
				}


				// Playback and sync
				if (current_time >= this.sync_offset) {
					if (this.audio_play_style[1] == PLAY_LOOPED) {
						// Sync
						var t;
						if (Math.abs((t = this_private.get_audio_position_at_time.call(this, current_time)) - this.audio_tag.currentTime) > this.audio_desync_max) {
							this.audio_tag.currentTime = t;
						}

						// Play looped
						this.audio_tag.loop = true;
						this.audio_tag.play();
					}
					else {
						// Remove any looping
						this.audio_tag.loop = false;

						if (current_time < this.sync_offset + this.min_duration) {
							// Sync
							var t;
							if (Math.abs((t = this_private.get_audio_position_at_time.call(this, current_time)) - this.audio_tag.currentTime) > this.audio_desync_max) {
								this.audio_tag.currentTime = t;
							}

							// Play normally
							this.audio_tag.play();
						}
						else {
							// Sync at end
							this.audio_tag.currentTime = this.audio_duration;
						}
					}
				}
				else {
					if (this.audio_play_style[0] == PLAY_LOOPED) {
						// Sync
						var t;
						if (Math.abs((t = this_private.get_audio_position_at_time.call(this, current_time)) - this.audio_tag.currentTime) > this.audio_desync_max) {
							this.audio_tag.currentTime = t;
						}

						// Play looped
						this.audio_tag.loop = true;
						this.audio_tag.play();

						// Set timers to stop looping
						if (this.audio_play_style[1] != PLAY_LOOPED) {
							this.audio_loop_stop_timer = setTimeout(function() {
								this_private.on_timed_audio_loop_stop.call(self);
							}, (this.sync_offset + this.min_duration - current_time) * 1000);
							this.audio_loop_remove_timer = setTimeout(function() {
								this_private.on_timed_audio_loop_remove.call(self);
							}, (this.sync_offset + this.min_duration / 2.0 - current_time) * 1000);
						}
					}
					else {
						// Sync at 0
						this.audio_tag.currentTime = 0.0;

						// Set timer to activate playback at the proper time
						this.sync_timer = setTimeout(function() {
							this_private.on_timed_audio_play.call(self);
						}, (this.sync_offset - current_time) * 1000);
					}
				}


				// Play video
				this.video_tag.play();
			}
			else {
				// Get the current time
				var current_time = this.audio_tag.currentTime;
				if (current_time >= this.max_duration) {
					// Reset
					this.audio_tag.currentTime = 0.0;
					current_time = 0.0;
				}


				// Animation
				if (current_time >= this.sync_offset) {
					// During/after designated playback period
					if (this.video_play_style[1] == DISPLAY_LOOPED) {
						// Currently playing
						this.video_tag.style.opacity = "1.0";
					}
					else if (this.video_play_style[1] != DISPLAY_VIDEO) { // Nothing to do if DISPLAY_VIDEO
						// Image opacity
						this.image_tag.style.opacity = (this.video_play_style[1] == DISPLAY_NOTHING) ? 0.0 : 1.0;

						// State check
						if (current_time < this.sync_offset + this.min_duration) {
							// Currently playing
							this.video_tag.style.opacity = "1.0";
						}
						else {
							// Video opacity
							if (this.video_fades[1]) {
								// Fade out
								var time_left = ((this.sync_offset + this.min_duration + this.video_animation_time[1]) - current_time);
								if (time_left > 0.0) {
									// Continue
									this_private.video_animate.call(this, 1, time_left);
								}
								else {
									// Completed
									this.video_tag.style.opacity = "0.0";
								}
							}
							else {
								// Vanish
								this.video_tag.style.opacity = "0.0";
							}
						}
					}
				}
				else {
					// Before designated playback period
					if (this.video_play_style[0] == DISPLAY_LOOPED) {
						// Currently playing
						this.video_tag.style.opacity = "1.0";
					}
					else if (this.video_play_style[0] != DISPLAY_VIDEO) { // Nothing to do if DISPLAY_VIDEO
						// Image opacity
						this.image_tag.style.opacity = (this.video_play_style[0] == DISPLAY_NOTHING) ? 0.0 : 1.0;

						// Video opacity
						if (this.video_fades[0]) {
							// Fade in
							var wait_time = this.sync_offset - this.video_animation_time[0] - current_time;
							if (wait_time < 0) {
								// Continue
								this_private.video_animate.call(this, 0, this.video_animation_time[0] + wait_time);
							}
							else {
								// Not visible
								this.video_tag.style.opacity = "0.0";

								// Queue for late
								this.video_animate_timer = setTimeout(function() {
									self.video_animate_timer = null;
									this_private.video_animate.call(self, 0, self.video_animation_time[0]);
								}, wait_time * 1000);
							}
						}
						else {
							// Vanish
							this.video_tag.style.opacity = "0.0";
						}
					}
				}


				// Playback and sync
				if (current_time >= this.sync_offset) {
					if (this.video_play_style[1] == DISPLAY_LOOPED) {
						// Sync
						var t;
						if (Math.abs((t = this_private.get_video_position_at_time.call(this, current_time)) - this.video_tag.currentTime) > this.video_desync_max) {
							this.video_tag.currentTime = t;
						}

						// Play looped
						this.video_tag.loop = true;
						this.video_tag.play();
					}
					else {
						// Remove any looping
						this.video_tag.loop = false;

						if (current_time < this.sync_offset + this.min_duration) {
							// Sync
							var t;
							if (Math.abs((t = this_private.get_video_position_at_time.call(this, current_time)) - this.video_tag.currentTime) > this.video_desync_max) {
								this.video_tag.currentTime = t;
							}

							// Play normally
							this.video_tag.play();
						}
						else {
							// Sync at end
							this.video_tag.currentTime = this.video_duration;
						}
					}
				}
				else {
					if (this.video_play_style[0] == DISPLAY_LOOPED) {
						// Sync
						var t;
						if (Math.abs((t = this_private.get_video_position_at_time.call(this, current_time)) - this.video_tag.currentTime) > this.video_desync_max) {
							this.video_tag.currentTime = t;
						}

						// Play looped
						this.video_tag.loop = true;
						this.video_tag.play();

						// Set timers to stop looping
						if (this.video_play_style[1] != DISPLAY_LOOPED) {
							this.video_loop_stop_timer = setTimeout(function() {
								this_private.on_timed_video_loop_stop.call(self);
							}, (this.sync_offset + this.min_duration - current_time) * 1000);
							this.video_loop_remove_timer = setTimeout(function() {
								this_private.on_timed_video_loop_remove.call(self);
							}, (this.sync_offset + this.min_duration / 2.0 - current_time) * 1000);
						}
					}
					else {
						// Sync at 0
						this.video_tag.currentTime = 0.0;

						// Set timer to activate playback at the proper time
						this.sync_timer = setTimeout(function() {
							this_private.on_timed_video_play.call(self);
						}, (this.sync_offset - current_time) * 1000);
					}
				}

				// Play audio
				this.audio_tag.play();
			}
		},

		/**
			Internal way of seeking and synchronizing separate audio/video tracks.

			@param time
				the time to seek to
		*/
		seek_synced: function (time) {
			// Pause
			var playing = !this.paused;
			if (playing) {
				// Pause
				this.paused = true;
				this_private.clear_timers.call(this);
				if (this.video_tag != null) {
					this.video_tag.pause();
					this_private.video_animate_stop.call(this);
				}
				if (this.audio_tag != null) {
					this.audio_tag.pause();
				}
			}

			// Seek
			this.main_tag.currentTime = time;
			this_private.sync_animation_at.call(this, time);

			// Resume
			if (playing) {
				// Play
				this.paused = false;
				if (this.video_tag != null) {
					if (this.audio_tag != null) {
						// Play synchronized
						this_private.play_synced.call(this);
					}
					else {
						// Play only video
						this.video_tag.play();
					}
				}
				else {
					// Audio only
					this.audio_tag.play();
				}
			}
		},

		/**
			Sets the animation of video/audio to a current time.

			@param time
				the time to sync at
		*/
		sync_animation_at: function (time) {
			if (this.has_both) {
				if (this.video_main) {
					this.video_tag.style.opacity = "1.0";
					this.audio_tag.currentTime = this_private.get_audio_position_at_time.call(this, time);
					this.audio_tag.volume = this.volume * this_private.get_audio_volume_at_time.call(this, time);
				}
				else {
					this.video_tag.style.opacity = this_private.get_video_opacity_at_time.call(this, time);
					this.video_tag.currentTime = this_private.get_video_position_at_time.call(this, time);
				}
			}
			else {
				if (this.video_tag != null) this.video_tag.style.opacity = "1.0";
				this.main_tag.volume = this.volume;
			}
			this.image_tag.style.opacity = this_private.get_image_opacity_at_time.call(this, time);
		},


		/**
			Add a managed callback to the video tag.

			@param name
				the event name
			@param callback
				the callback function
		*/
		add_video_callback: function (name, callback) {
			this.video_callbacks.push([name,callback]);
			this.video_tag.addEventListener(name, callback);
		},

		/**
			Add a managed callback to the audio tag.

			@param name
				the event name
			@param callback
				the callback function
		*/
		add_audio_callback: function (name, callback) {
			this.audio_callbacks.push([name,callback]);
			this.audio_tag.addEventListener(name, callback);
		},

		/**
			Add a managed callback to the image tag.

			@param name
				the event name
			@param callback
				the callback function
		*/
		add_image_callback: function (name, callback) {
			this.image_callbacks.push([name,callback]);
			this.image_tag.addEventListener(name, callback);
		},


		/**
			Get how transparent the video should be at time.
			Should not be called if the video is the main track.

			@param time
				the time to check
			@return
				a number between 0.0 and 1.0 representing the opacity
		*/
		get_video_opacity_at_time: function (time) {
			if (time >= this.sync_offset) {
				if (this.video_play_style[1] == DISPLAY_IMAGE || this.video_play_style[1] == DISPLAY_NOTHING) {
					if (time <= this.sync_offset + this.min_duration) {
						return 1.0;
					}
					else if (this.video_fades[1]) {
						var t = Math.min(this.max_duration - (this.sync_offset + this.min_duration), this.video_animation_time[1]);
						return Math.max(0.0, ((this.sync_offset + this.min_duration + t) - time) / t);
					}
					else {
						return 0.0;
					}
				}
				else {
					return 1.0;
				}
			}
			else {
				if (this.video_play_style[0] == DISPLAY_IMAGE || this.video_play_style[0] == DISPLAY_NOTHING) {
					if (this.video_fades[0]) {
						var t = Math.min(this.sync_offset, this.video_animation_time[0]);
						return Math.max(0.0, (time - (this.sync_offset - t)) / t);
					}
					else {
						return 0.0;
					}
				}
				else {
					return 1.0;
				}
			}
		},

		/**
			When the audio is the main track, check where the video should be
			playing at given a certain time.
			Should not be called if the video is the main track.

			@param time
				the time to check
			@return
				the time in the video in seconds
		*/
		get_video_position_at_time: function (time) {
			if (time >= this.sync_offset) {
				if (this.video_play_style[1] == DISPLAY_LOOPED) {
					return (time - this.sync_offset) % this.video_duration;
				}
				else {
					return Math.min(this.video_duration, time - this.sync_offset);
				}
			}
			else {
				if (this.video_play_style[0] == DISPLAY_LOOPED) {
					return this.video_duration - ((this.sync_offset - time) % this.video_duration);
				}
				else {
					return 0.0;
				}
			}
		},

		/**
			Get the volume of the audio at a certain time.
			Should not be called if the audio is the main track.

			@param time
				the time to check
			@return
				a number between 0.0 and 1.0 representing the volume factor
		*/
		get_audio_volume_at_time: function (time) {
			var min_time = (this.audio_play_style[0] == PLAY_LOOPED ? 0.0 : this.sync_offset);
			var max_time = (this.audio_play_style[1] == PLAY_LOOPED ? this.max_duration : this.sync_offset + this.min_duration);

			if (time >= min_time) {
				if (this.audio_play_style[1] == PLAY_NOTHING) {
					if (time <= max_time) {
						if (this.audio_fades[0] && time < min_time + this.audio_animation_time[0]) {
							return Math.min(1.0, (time - min_time) / this.audio_animation_time[0]);
						}
						else if (this.audio_fades[1] && time > max_time - this.audio_animation_time[1]) {
							return Math.min(1.0, (max_time - time) / this.audio_animation_time[1]);
						}
						return 1.0;
					}
					else {
						return 0.0;
					}
				}
				else {
					return 1.0;
				}
			}
			else {
				return (this.audio_play_style[0] == PLAY_NOTHING) ? 0.0 : 1.0;
			}
		},

		/**
			When the video is the main track, check where the audio should be
			playing at given a certain time.
			Should not be called if the audio is the main track.

			@param time
				the time to check
			@return
				the time in the audio in seconds
		*/
		get_audio_position_at_time: function (time) {
			if (time >= this.sync_offset) {
				if (this.audio_play_style[1] == DISPLAY_LOOPED) {
					return (time - this.sync_offset) % this.audio_duration;
				}
				else {
					return Math.min(this.audio_duration, time - this.sync_offset);
				}
			}
			else {
				if (this.audio_play_style[0] == DISPLAY_LOOPED) {
					return this.audio_duration - ((this.sync_offset - time) % this.audio_duration);
				}
				else {
					return 0.0;
				}
			}
		},

		/**
			Get how transparent the image should be at a given time.

			@param time
				the time to check
			@return
				a number between 0.0 and 1.0 representing the opacity
		*/
		get_image_opacity_at_time: function (time) {
			if (this.video_tag == null) {
				return 1.0;
			}
			else if (time >= this.sync_offset + this.min_duration) {
				return (this.video_play_style[1] == DISPLAY_NOTHING ? 0.0 : 1.0);
			}
			else {
				return (this.video_play_style[0] == DISPLAY_NOTHING ? 0.0 : 1.0);
			}
		},

		/**
			Make the video fade in or out.

			@param mode
				0 for animating in
				1 for animating out
				other values are not valid
			@param time
				the duration of the animation in seconds
		*/
		video_animate: function (mode, time) {
			this_private.video_animate_stop.call(this);

			this.video_tag.className = add_class(this.video_tag.className, css_video_opacity_animations[mode]);
			set_animation_time(this.video_tag, time * 1000);
		},

		/**
			Remove any CSS animations from the video.
		*/
		video_animate_stop: function () {
			if (has_class(this.video_tag.className, css_video_opacity_animations[0])) {
				this.video_tag.style.opacity = get_computed_style(this.video_tag).opacity;
				this.video_tag.className = remove_class(this.video_tag.className, css_video_opacity_animations[0]);
			}
			else if (has_class(this.video_tag.className, css_video_opacity_animations[1])) {
				this.video_tag.style.opacity = get_computed_style(this.video_tag).opacity;
				this.video_tag.className = remove_class(this.video_tag.className, css_video_opacity_animations[1]);
			}
			clear_animation_time(this.video_tag);
		},


		/**
			Event callback for the video tag.
			Called when the metadata is ready.
		*/
		on_video_loaded_metadata: function () {
			// Video
			this.video_dimensions.width = this.video_tag.videoWidth;
			this.video_dimensions.height = this.video_tag.videoHeight;
			this.video_duration = this.video_tag.duration;
			this.video_tag.volume = (this.audio_tag == null ? this.volume : 0.0);

			if (++this.metadata_load_count == this.metadata_load_count_required) {
				this_private.on_metadata_ready.call(this);
			}
		},

		/**
			Event callback for the video tag.
			Called when any CSS animations have completed.
		*/
		on_video_animation_end: function () {
			if (has_class(this.video_tag.className, css_video_opacity_animations[0])) {
				// Fade in
				this.video_tag.className = remove_class(this.video_tag.className, css_video_opacity_animations[0]);
				this.video_tag.style.opacity = "1.0";
			}
			else if (has_class(this.video_tag.className, css_video_opacity_animations[1])) {
				// Fade out
				this.video_tag.className = remove_class(this.video_tag.className, css_video_opacity_animations[1]);
				this.video_tag.style.opacity = "0.0";
			}
			clear_animation_time(this.video_tag);
		},

		/**
			Event callback for the video tag.
			Called when the video ends.
		*/
		on_video_ended: function () {
			if (this.video_tag.loop) return;

			if (this.video_main) {
				// Pause all
				this.paused = true;
				this_private.clear_timers.call(this);
				if (this.audio_tag != null) {
					this.audio_tag.pause();
				}

				// Event
				this_private.trigger.call(this, "end", {
					"time": this.max_duration
				});
			}
			else {
				if (this.paused) return; // don't want this event triggering

				// Animation
				if (this.video_play_style[1] == DISPLAY_VIDEO) {
					// Nothing needs to be done
				}
				else {
					// Image opacity
					this.image_tag.style.opacity = (this.video_play_style[1] == DISPLAY_NOTHING) ? 0.0 : 1.0;

					// Video opacity
					if (this.video_fades[1]) {
						// Fade out
						//var t = Math.min(this.max_duration - (this.sync_offset + this.min_duration), this.video_animation_time[1]);
						var offset = (this.sync_offset + this.min_duration);
						var t = Math.min(this.max_duration - offset, this.video_animation_time[1] - (this.audio_tag.currentTime - offset));
						if (t > 0) {
							this_private.video_animate.call(this, 1, t);
						}
					}
					else {
						// Vanish
						this.video_tag.style.opacity = "0.0";
					}
				}
			}
		},

		/**
			Event callback for the video tag.
			Called when the video generates an error.
		*/
		on_video_error: function () {
			// Event
			this_private.trigger.call(this, "error", {
				"source": "video"
			});
		},

		/**
			Event callback for the audio tag.
			Called when the metadata is ready.
		*/
		on_audio_loaded_metadata: function () {
			// Audio
			this.audio_duration = this.audio_tag.duration;
			this.audio_tag.volume = this.volume;

			if (++this.metadata_load_count == this.metadata_load_count_required) {
				this_private.on_metadata_ready.call(this);
			}
		},

		/**
			Event callback for the audio tag.
			Called when the audio ends.
		*/
		on_audio_ended: function () {
			if (this.audio_tag.loop) return;

			if (this.video_main) {
				// Nothing to do
			}
			else {
				// Pause all
				this.paused = true;
				this_private.clear_timers.call(this);
				if (this.video_tag != null) {
					this.video_tag.pause();
					this_private.video_animate_stop.call(this);
				}

				// Event
				this_private.trigger.call(this, "end", {
					"time": this.max_duration
				});
			}
		},

		/**
			Event callback for the audio tag.
			Called when the audio generates an error.
		*/
		on_audio_error: function () {
			// Event
			this_private.trigger.call(this, "error", {
				"source": "audio"
			});
		},

		/**
			Event callback for the video/audio tag, whichever is longer.
			Called when the tag generates a timeupdate event and passes it to the VPlayer listeners.
		*/
		on_main_time_update: function () {
			// Event
			this_private.trigger.call(this, "timeupdate", {
				"time": this.main_tag.currentTime,
				"duration": this.max_duration
			});
		},

		/**
			Event callback for the image tag.
			Called when the image loads.
		*/
		on_image_load: function () {
			this.image_dimensions.width = this.image_tag.width;
			this.image_dimensions.height = this.image_tag.height;

			this.image_tag.style.display = "";
			this.image_tag.style.left = "0";
			this.image_tag.style.top = "0";
			this.image_tag.style.right = "0";
			this.image_tag.style.bottom = "0";
			this.image_tag.style.width = "100%";
			this.image_tag.style.height = "100%";

			if (++this.metadata_load_count == this.metadata_load_count_required) {
				this_private.on_metadata_ready.call(this);
			}
		},

		/**
			Event callback for the image tag.
			Called when the image generates an error.
		*/
		on_image_error: function () {
			// Event
			this_private.trigger.call(this, "error", {
				"source": "image"
			});
		},


		/**
			Callback for when all metadata is loaded.
			Called when both of the video/audio tag metadata loaded callbacks
			are fired.
		*/
		on_metadata_ready: function () {
			// Min/max time and main track
			if (this.video_duration >= this.audio_duration) {
				this.max_duration = this.video_duration;
				this.min_duration = this.audio_duration;
				this.video_main = true;
				this.main_tag = this.video_tag;
			}
			else {
				this.max_duration = this.audio_duration;
				this.min_duration = this.video_duration;
				this.video_main = false;
				this.main_tag = this.audio_tag;
			}

			// Validate
			if (this.sync_offset + this.min_duration > this.max_duration) {
				this.sync_offset = this.max_duration - this.min_duration;
			}
			else if (this.sync_offset < 0.0) {
				this.sync_offset = 0.0;
			}

			// Animation initial state
			this_private.sync_animation_at.call(this, 0.0);

			// Time callback
			var self = this;
			if (this.video_main) {
				this_private.add_video_callback.call(this, "timeupdate", function () {
					this_private.on_main_time_update.call(self);
				});
			}
			else {
				this_private.add_audio_callback.call(this, "timeupdate", function () {
					this_private.on_main_time_update.call(self);
				});
			}

			// Ready
			this.metadata_ready = true;
			this_private.trigger.call(this, "load", {
				"video_size": this.get_video_size(),
				"image_size": this.get_image_size(),
				"duration": this.max_duration
			});
		},

		/**
			Synchronization timer to play video.
		*/
		on_timed_video_play: function () {
			this.sync_timer = null;

			if (this.video_play_style[0] != DISPLAY_VIDEO && !this.video_fades[0]) {
				// Should never be called with DISPLAY_LOOPED
				this.video_tag.style.opacity = "1.0";
			}
			this.video_tag.loop = (this.video_play_style[1] == DISPLAY_LOOPED);

			// Play
			this.video_tag.play();
		},

		/**
			Timer to set the .loop attribute on the video to false.
			Cancels the "on_timed_video_loop_stop" timer when executed.
		*/
		on_timed_video_loop_remove: function () {
			// Clear timers
			this.video_loop_remove_timer = null;
			if (this.video_loop_stop_timer != null) {
				clearTimeout(this.video_loop_stop_timer);
				this.video_loop_stop_timer = null;
			}

			// Disable looping
			this.video_tag.loop = false;
		},

		/**
			Timer to set the .loop attribute on the video to false AND stop playback.
			This is the fallback of the above timer, in case there are timing issues.
		*/
		on_timed_video_loop_stop: function () {
			// Clear timers
			this.video_loop_stop_timer = null;
			if (this.video_loop_remove_timer != null) {
				clearTimeout(this.video_loop_remove_timer);
				this.video_loop_remove_timer = null;
			}

			// Stop video
			this.video_tag.loop = false;
			this.video_tag.pause();
			this.video_tag.currentTime = this.video_duration;
		},

		/**
			Synchronization timer to play audio.
		*/
		on_timed_audio_play: function () {
			this.sync_timer = null;

			this.audio_tag.loop = (this.audio_play_style[1] == PLAY_LOOPED);

			this.audio_tag.play();
		},

		/**
			Timer to set the .loop attribute on the audio to false.
			Cancels the "on_timed_video_loop_stop" timer when executed.
		*/
		on_timed_audio_loop_remove: function () {
			// Clear timers
			this.audio_loop_remove_timer = null;
			if (this.audio_loop_stop_timer != null) {
				clearTimeout(this.audio_loop_stop_timer);
				this.audio_loop_stop_timer = null;
			}

			// Disable looping
			this.audio_tag.loop = false;
		},

		/**
			Timer to set the .loop attribute on the audio to false AND stop playback.
			This is the fallback of the above timer, in case there are timing issues.
		*/
		on_timed_audio_loop_stop: function () {
			// Clear timers
			this.audio_loop_stop_timer = null;
			if (this.audio_loop_remove_timer != null) {
				clearTimeout(this.audio_loop_remove_timer);
				this.audio_loop_remove_timer = null;
			}

			// Stop video
			this.audio_tag.loop = false;
			this.audio_tag.pause();
			this.audio_tag.currentTime = this.audio_duration;
		},

		/**
			Timer to "animate" the audio tag's volume in or out.
		*/
		on_audio_animate: function () {
			this.audio_animate_timer = null;

			// Vars
			var self = this;
			var current_time = this.main_tag.currentTime;
			var min_time = (this.audio_play_style[0] == PLAY_LOOPED ? 0.0 : this.sync_offset);
			var max_time = (this.audio_play_style[1] == PLAY_LOOPED ? this.max_duration : this.sync_offset + this.min_duration);

			// Full
			if (current_time >= max_time) {
				this.audio_tag.volume = 0.0;

				// No timeout
			}
			else if (current_time >= max_time - this.audio_animation_time[1]) {
				this.audio_tag.volume = Math.max(0.0, (max_time - current_time) / this.audio_animation_time[1] * this.volume);

				// Timeout for continue
				this.audio_animate_timer = setTimeout(function() {
					this_private.on_audio_animate.call(self);
				}, this.audio_animation_interval);
			}
			else if (current_time >= min_time + this.audio_animation_time[0]) {
				this.audio_tag.volume = this.volume;

				// Timeout for outro
				this.audio_animate_timer = setTimeout(function() {
					this_private.on_audio_animate.call(self);
				}, ((max_time - this.audio_animation_time[1]) - current_time) * 1000);
			}
			else {
				this.audio_tag.volume = Math.max(0.0, (current_time - min_time) / this.audio_animation_time[0] * this.volume);

				// Timeout for continue
				this.audio_animate_timer = setTimeout(function() {
					this_private.on_audio_animate.call(self);
				}, this.audio_animation_interval);
			}
		}

	};

	// Public methods
	vp.prototype = {

		constructor: vp,

		/**
			Generate settings from the videcode object.

			@param [videcode]
				a Videcode object which has been properly initialized
				if not set in the constructor, it can be set here;
				it is the Videcode object to use
			@return
				this
		*/
		gen_data: function (videcode) {
			// Clear any old data
			this.reset();

			// Set
			if (videcode !== undefined) this.videcode = videcode;

			// On error, return
			if (this.videcode == null || this.videcode.has_error()) return;

			// Create video blob and url
			if (this.videcode.get_video() != null) {
				this.video_blob = new Blob([ this.videcode.get_video() ], {type: "video/webm"});
				this.video_blob_url = (window.webkitURL || window.URL).createObjectURL(this.video_blob);
				++this.metadata_load_count_required;
			}
			else {
				this.video_blob = null;
				this.video_blob_url = null;
			}

			// Create audio blob and url
			if (this.videcode.get_audio() != null) {
				this.audio_blob = new Blob([ this.videcode.get_audio() ], {type: "audio/ogg"});
				this.audio_blob_url = (window.webkitURL || window.URL).createObjectURL(this.audio_blob);
				++this.metadata_load_count_required;
			}
			else {
				this.audio_blob = null;
				this.audio_blob_url = null;
			}

			// Create image blob and url
			this.image_blob = new Blob([ this.videcode.get_image() ], {type: this.videcode.get_image_mime_type()});
			this.image_blob_url = (window.webkitURL || window.URL).createObjectURL(this.image_blob);
			++this.metadata_load_count_required;

			// Get other settings
			this.sync_offset = this.videcode.get_sync_offset();

			this.video_fades[0] = this.videcode.get_video_fade(true);
			this.video_fades[1] = this.videcode.get_video_fade(false);
			this.audio_fades[0] = this.videcode.get_audio_fade(true);
			this.audio_fades[1] = this.videcode.get_audio_fade(false);

			this.video_play_style[0] = this.videcode.get_video_play_style(true);
			this.video_play_style[1] = this.videcode.get_video_play_style(false);
			this.audio_play_style[0] = this.videcode.get_audio_play_style(true);
			this.audio_play_style[1] = this.videcode.get_audio_play_style(false);

			return this;
		},

		/**
			Remove all event listeners.

			@return
				this
		*/
		clear_listeners: function () {
			this.event_listeners = {
				"load": [],
				"error": [],
				"timeupdate": [],
				"volumechange": [],
				"seek": [],
				"play": [],
				"pause": [],
				"end": [],
			};

			return this;
		},

		/**
			Reset the state of the object.

			@return
				this
		*/
		reset: function () {
			// Remove HTML
			this.remove_html();

			// Clear data
			if (this.video_blob != null) {
				this.video_blob = null;
				(window.webkitURL || window.URL).revokeObjectURL(this.video_blob_url);
				this.video_blob_url = null;
			}
			if (this.audio_blob != null) {
				this.audio_blob = null;
				(window.webkitURL || window.URL).revokeObjectURL(this.audio_blob_url);
				this.audio_blob_url = null;
			}
			if (this.image_blob != null) {
				this.image_blob = null;
				(window.webkitURL || window.URL).revokeObjectURL(this.image_blob_url);
				this.image_blob_url = null;
			}

			// Other settings
			this.volume = 0.5;

			this.metadata_load_count_required = 0;

			this.sync_offset = 0.0;

			this.video_fades = [ false , false ];
			this.audio_fades = [ false , false ];

			this.video_play_style = [ DISPLAY_NOTHING , DISPLAY_NOTHING ];
			this.audio_play_style = [ PLAY_NOTHING , PLAY_NOTHING ];

			return this;
		},

		/**
			Check if the object has HTML generated or not.

			@return
				true if generated, false otherwise
		*/
		has_html: function () {
			return (this.element_container != null);
		},

		/**
			Remove all the HTML elements of the object from the document.

			@return
				this
		*/
		remove_html: function () {
			// Clear timers
			this_private.clear_timers.call(this);
			this.pause();

			// Remove HTML
			if (this.video_tag != null) {
				for (var i = 0; i < this.video_callbacks.length; ++i) {
					this.video_tag.removeEventListener(this.video_callbacks[i][0], this.video_callbacks[i][1]);
				}
				this.video_callbacks = [];

				if (this.video_tag.parentNode != null) {
					this.video_tag.parentNode.removeChild(this.video_tag);
				}
				this.video_tag = null;
			}
			if (this.audio_tag != null) {
				for (var i = 0; i < this.audio_callbacks.length; ++i) {
					this.audio_tag.removeEventListener(this.audio_callbacks[i][0], this.audio_callbacks[i][1]);
				}
				this.audio_callbacks = [];

				if (this.audio_tag.parentNode != null) {
					this.audio_tag.parentNode.removeChild(this.audio_tag);
				}
				this.audio_tag = null;
			}
			if (this.image_tag != null) {
				for (var i = 0; i < this.image_callbacks.length; ++i) {
					this.image_tag.removeEventListener(this.image_callbacks[i][0], this.image_callbacks[i][1]);
				}
				this.image_callbacks = [];

				if (this.image_tag.parentNode != null) {
					this.image_tag.parentNode.removeChild(this.image_tag);
				}
				this.image_tag = null;
			}
			if (this.element_container != null) {
				if (this.element_container.parentNode != null) {
					this.element_container.parentNode.removeChild(this.element_container);
				}
				this.element_container = null;
			}
			this.main_tag = { "currentTime": 0.0 }; // have defaults so get_time() can work without fail

			// Other settings
			this.paused = true;

			this.video_duration = 0.0;
			this.audio_duration = 0.0;
			this.max_duration = 0.0;
			this.min_duration = 0.0;
			this.video_dimensions = { width: 0, height: 0 };
			this.image_dimensions = { width: 0, height: 0 };
			this.metadata_load_count = 0;
			this.metadata_ready = false;
			this.video_main = true;
			this.has_both = false;

			return this;
		},

		/**
			Create the HTML elements for the player. The new components will be added
			in a new div tag into the specified container. The components include a
			video tag (if there is video), an audio tag (if there is audio), and an
			img tag.

			The div tag will fill the nearest relative container, as it is positioned
			absolutely.

			Events should generally be hooked before calling this.

			@param container
				the container to add the new elements to
			@return
				this
		*/
		create_html: function (container) {
			if (this.image_blob == null || (this.audio_blob == null && this.video_blob == null) || this.element_container != null) return this;

			var self = this;

			// Create container
			this.element_container = document.createElement("div");
			this.element_container.style.position = "relative";
			this.element_container.style.display = "inline-block";
			if (container != null) container.appendChild(this.element_container);

			// Create image
			this.image_tag = document.createElement("img");
			this.image_tag.style.position = "absolute";
			this.image_tag.style.display = "none";
			// Image events
			this_private.add_image_callback.call(this, "load", function () {
				this_private.on_image_load.call(self);
			});
			this_private.add_image_callback.call(this, "error", function () {
				this_private.on_image_error.call(self);
			});
			// Load
			this.image_tag.setAttribute("src", this.image_blob_url);
			this.element_container.appendChild(this.image_tag);

			// Create video
			if (this.video_blob_url != null) {
				this.video_tag = document.createElement("video");
				this.video_tag.style.position = "absolute";
				this.video_tag.style.left = "0";
				this.video_tag.style.top = "0";
				this.video_tag.style.right = "0";
				this.video_tag.style.bottom = "0";
				this.video_tag.style.width = "100%";
				this.video_tag.style.height = "100%";
				this.video_tag.style.opacity = "0.0";
				// Video events
				this_private.add_video_callback.call(this, "loadedmetadata", function () {
					this_private.on_video_loaded_metadata.call(self);
				});
				this_private.add_video_callback.call(this, "ended", function () {
					this_private.on_video_ended.call(self);
				});
				this_private.add_video_callback.call(this, "error", function () {
					this_private.on_video_error.call(self);
				});
				this_private.add_video_callback.call(this, "animationend", function () {
					this_private.on_video_animation_end.call(self);
				});
				this_private.add_video_callback.call(this, "webkitAnimationEnd", function () {
					this_private.on_video_animation_end.call(self);
				});
				this_private.add_video_callback.call(this, "oanimationend", function () {
					this_private.on_video_animation_end.call(self);
				});
				this_private.add_video_callback.call(this, "MSAnimationEnd", function () {
					this_private.on_video_animation_end.call(self);
				});
				// Load video
				this.video_tag.setAttribute("src", this.video_blob_url);
				this.element_container.appendChild(this.video_tag);
			}

			// Create audio
			if (this.audio_blob_url != null) {
				this.audio_tag = document.createElement("audio");
				this.audio_tag.style.display = "none";
				// Audio events
				this_private.add_audio_callback.call(this, "loadedmetadata", function () {
					this_private.on_audio_loaded_metadata.call(self);
				});
				this_private.add_audio_callback.call(this, "ended", function () {
					this_private.on_audio_ended.call(self);
				});
				this_private.add_audio_callback.call(this, "error", function () {
					this_private.on_audio_error.call(self);
				});
				// Load audio
				this.audio_tag.setAttribute("src", this.audio_blob_url);
				this.element_container.appendChild(this.audio_tag);
			}

			// Both/main tag
			if (this.video_tag != null) {
				if (this.audio_tag != null) {
					this.has_both = true;
					this.main_tag = (this.video_main ? this.video_tag : this.audio_tag);
				}
				else {
					this.has_both = false;
					this.main_tag = this.video_tag;
				}
			}
			else {
				this.has_both = false;
				this.main_tag = this.audio_tag;
			}

			// Done
			return this;
		},

		/**
			Get the HTML div container element created in the create_html() method.

			@return
				null if not generated yet,
				otherwise a HTML div element
		*/
		get_container: function () {
			return this.element_container;
		},

		/**
			Get the generated image URL.

			@return
				the blob URL
		*/
		get_image: function () {
			return this.image_blob_url;
		},

		/**
			Get the generated video URL.

			@return
				the blob URL, or null if no video
		*/
		get_video: function () {
			return this.video_blob_url;
		},

		/**
			Get the generated audio URL.

			@return
				the blob URL, or null if no audio
		*/
		get_audio: function () {
			return this.audio_blob_url;
		},

		/**
			Get the current volume level.

			@return
				a value between 0.0 and 1.0, 1.0 being the max
		*/
		get_volume: function () {
			return this.volume;
		},

		/**
			Set the current volume level.
			This method can be called at any time.

			@param volume
				a number between 0.0 and 1.0, 1.0 being the max
		*/
		set_volume: function (volume) {
			if (volume < 0.0) volume = 0.0;
			else if (volume > 1.0) volume = 1.0;

			this.volume = volume;
			if (this.has_both) {
				if (this.video_main) {
					this.audio_tag.volume = this.volume * this_private.get_audio_volume_at_time.call(this, this.main_tag.currentTime);
				}
				else {
					this.audio_tag.volume = this.volume;
				}
			}
			else {
				this.main_tag.volume = this.volume;
			}

			// Event
			this_private.trigger.call(this, "volumechange", {
				"volume": this.volume
			});
		},

		/**
			Play the player. Will do nothing if the object isn't ready or is already playing.
		*/
		play: function () {
			if (!this.paused || !this.metadata_ready) return;

			// Play
			this.paused = false;
			if (this.has_both) {
				// Sync'd
				this_private.play_synced.call(this);
			}
			else {
				// Video/audio only
				this.main_tag.play();
			}

			// Event
			this_private.trigger.call(this, "play", {
				"time": this.main_tag.currentTime
			});
		},

		/**
			Pause the player. Will do nothing if the object isn't ready or is already paused.
		*/
		pause: function () {
			if (this.paused || !this.metadata_ready) return;

			// Pause all
			this.paused = true;
			this_private.clear_timers.call(this);
			if (this.video_tag != null) {
				this.video_tag.pause();
				this_private.video_animate_stop.call(this);
			}
			if (this.audio_tag != null) {
				this.audio_tag.pause();
			}

			// Event
			this_private.trigger.call(this, "pause", {
				"time": this.main_tag.currentTime
			});
		},

		/**
			Seek to a specific time.

			@param time
				a value between 0.0 and get_duration()
		*/
		seek: function (time) {
			if (!this.metadata_ready) return;

			// Limit time
			if (time < 0.0) time = 0.0;
			else if (time > this.max_duration) time = this.max_duration;

			// Seek
			if (this.has_both) {
				// Play synchronized
				this_private.seek_synced.call(this, time);
			}
			else {
				// Video/audio only
				this.main_tag.currentTime = time;
			}

			// Event
			this_private.trigger.call(this, "seek", {
				"time": time,
				"duration": this.max_duration
			});
		},

		/**
			Check if the player is playing anything or not.

			@return
				true if playing, false if paused/not playing
		*/
		is_paused: function () {
			return this.paused;
		},

		/**
			Add an event callback in a jQuery-esque style.

			@param event_name
				the name of the event
			@param callback
				the function callback, in the form of: function (data)
			@return
				this
		*/
		on: function (event_name, callback) {
			if (typeof(callback) != function_type) return this;

			// Event adding
			if (event_name in this.event_listeners) {
				this.event_listeners[event_name].push(callback);
			}

			// Done
			return this;
		},

		/**
			Remove an event callback in a jQuery-esque style.

			@param event_name
				the name of the event
			@param [callback]
				if omitted, removes all callbacks on the event,
				otherwise, it is the function to remove
			@return
				this
		*/
		off: function (event_name, callback) {
			if (event_name in this.event_listeners) {
				if (typeof(callback) == function_type) {
					// Remove single
					var list = this.event_listeners[event_name];
					for (var i = 0; i < list.length; ++i) {
						if (list[i] === callback) {
							list.splice(i, 1);
							break;
						}
					}
				}
				else {
					// Remove all
					this.event_listeners[event_name] = [];
				}
			}

			// Done
			return this;
		},

		/**
			Get the size of the video. If there is no video, the values are both 0.

			@return
				an object in the form of { width:? , height:? }
		*/
		get_video_size: function () {
			return {
				"width": this.video_dimensions.width,
				"height": this.video_dimensions.height
			};
		},

		/**
			Get the size of the image.

			@return
				an object in the form of { width:? , height:? }
		*/
		get_image_size: function () {
			return {
				"width": this.image_dimensions.width,
				"height": this.image_dimensions.height
			};
		},

		/**
			Get the full duration of the object, in seconds.

			@return
				the duration
		*/
		get_duration: function () {
			return this.max_duration;
		},

		/**
			Get the minimum duration of the object; that is, if there is both audio
			and video in separate tags, returns the minimum length of the two. Otherwise,
			it returns the same as get_duration().

			@return
				the minimum duration
		*/
		get_min_duration: function () {
			return (this.has_both ? this.min_duration : this.max_duration);
		},

		/**
			Get the current time of the player.

			@return
				the time in seconds
		*/
		get_time: function () {
			return this.main_tag.currentTime;
		},

		/**
			Get the blob URL of the video object.

			@return
				a string URL, or null if there is no video
		*/
		get_video_url: function () {
			return this.video_blob_url;
		},

		/**
			Get the blob URL of the audio object.

			@return
				a string URL, or null if there is no separate audio
		*/
		get_audio_url: function () {
			return this.audio_blob_url;
		},

		/**
			Get the blob URL of the image object.

			@return
				a string URL
		*/
		get_image_url: function () {
			return this.image_blob_url;
		},

		/**
			Check if the video is the main tag; that is, if there is a video and
			audio tag, the video is longer than the audio.
			This is meaningless to call if there aren't both video and audio.

			@return
				true if the video is longer, false otherwise
		*/
		is_video_main: function () {
			return this.video_main;
		},

		/**
			Returns the synchronization offset.
			This value should always be in a valid range.

			@return
				a number in seconds of the offset
		*/
		get_sync_offset: function () {
			return this.sync_offset;
		},

		/**
			Check if the object has a video tag.

			@return
				true if it has video, false otherwise
		*/
		has_video: function () {
			return (this.video_tag != null);
		},

		/**
			Check if the object has a audio tag.

			@return
				true if it has audio, false otherwise
		*/
		has_audio: function () {
			return (this.audio_tag != null);
		},

		/**
			Check if the object has both audio and video tags.

			@return
				true if it has both, false otherwise
		*/
		has_video_and_audio: function () {
			return this.has_both;
		}

	};

	// Return
	return vp;

})();

