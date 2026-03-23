#!/bin/bash

# Ensure the output directory exists
mkdir -p ./img/mobile

for img in ./img/*.avif; do
    # Skip the loop if no .avif files are found
    [ -e "$img" ] || continue

    # Get just the filename (e.g., "image.avif") without the "img/" prefix
    filename=$(basename "$img")
    output_path="./img/mobile/$filename"

    if [[ "$img" == *"-background"* ]]; then
        magick "$img" -resize 50% "$output_path"
        
    elif [[ "$img" == *"-painting"* ]]; then
        magick "$img" -resize 100% "$output_path"

    elif [[ "$img" == *"-interior"* ]]; then
        magick "$img" -resize 50% "$output_path"
   
     else
        # Default process for everything else at 30%
        magick "$img" -resize 30% "$output_path"
    fi
done
