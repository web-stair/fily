# Fily - jQuery plugin for preview file input selected files
## Overview
Fily Plugin is a lightweight and user-friendly plugin designed to enhance the file input experience on your web application. It allows users to preview selected files directly within the browser before uploading them. The plugin supports a variety of popular file formats, including images, audio, video, and PDFs, providing a seamless and intuitive user interface.

## Supported File Types
**Image Files:** .png, .jpg, .jpeg, .jfif, .webp, .svg
**Audio Files:** .mp3
**Video Files:** .mp4
**Document Files:** .pdf
**Unsupported Files:** Displays a generic icon for any file type not listed above

## Features
**Real-time File Preview:** Instantly previews selected files, allowing users to see the content before uploading.
**Multiple File Support:** Handles multiple file inputs, displaying a preview for each selected file.
**Expand and Play:** For Images and Videos you can toggle fullscreen by clicking the thumbnail, for PDF you can explore the full file in a new tab by clicking the thumbnail, and for the audio files you can play the file by clicking the play button.
**Delete Buttons:** You can easily delete unwanted files from selected files with a click.
**Cross-browser Compatibility:** Ensures consistent performance across major web browsers.
**Responsive Design:** Previews adapt to various screen sizes and orientations, maintaining usability on mobile and desktop devices.

## How It Works
**Initialization:** Attach the plugin to your file input element.
File Selection: Upon selecting a file, the plugin checks the file extension.

## Preview Rendering:
**Images:** Displays the image directly.
**Audio:** Shows an audio player for .mp3 files.
**Video:** Shows a video player for .mp4 files.
**PDF:** Renders a preview of the PDF File.
**Unsupported Files:** Displays icon for the file extension.

## Installation
Include jQuery in your project.
Add the plugin's JavaScript and CSS files and the plugin will work immediately for any file input.

The jQuery File Preview Plugin simplifies the file selection process by providing immediate feedback on chosen files, enhancing user experience, and reducing errors during file uploads.
