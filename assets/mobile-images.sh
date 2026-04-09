#!/bin/bash

# Ensure the output directory exists
mkdir -p ./img/mobile
mkdir -p ./img/medium

for img in ./img/*.avif; do
    # Skip the loop if no .avif files are found
    [ -e "$img" ] || continue

    # Get just the filename (e.g., "image.avif") without the "img/" prefix
    filename=$(basename "$img")
    output_path_mobile="./img/mobile/$filename"
    output_path_medium="./img/medium/$filename"

    if [[ "$img" == *"-background"* ]]; then
        magick "$img" -resize 50% -quality 80 "$output_path_mobile"
        magick "$img" -resize 80% -quality 80 "$output_path_medium"
        
    elif [[ "$img" == *"-painting"* ]]; then
        magick "$img" -resize 80% -quality 90 "$output_path_mobile"
        magick "$img" -resize 80% -quality 90 "$output_path_medium"

    elif [[ "$img" == *"-interior"* ]]; then
        magick "$img" -resize 50% -quality 80 "$output_path_mobile"
        magick "$img" -resize 80% -quality 80 "$output_path_medium"
   
     else
        # Default process for everything else at 30%
        magick "$img" -resize 30% -quality 80 "$output_path_mobile"
        magick "$img" -resize 80% -quality 80 "$output_path_medium"
    fi
done
