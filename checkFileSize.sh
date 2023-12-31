#!/bin/bash

# Initialize status
status=0

# Loop through each .tsx file
find . -path ./node_modules -prune -o -name "*.tsx" -type f -print0 | while IFS= read -r -d '' file; do
    line_count=$(wc -l < "$file")
    if [ "$line_count" -gt 250 ]; then
        echo "$file has more than 250 lines ($line_count)"
        status=1
    fi
done

# Exit with status
exit $status
