#!/bin/bash

# Get the latest commit time from Git (UTC)
LAST_UPDATED=$(git log -1 --format=%cd --date=format:'%Y-%m-%d %H:%M:%S %Z')

# Write the last updated time to a JSON file
echo "{\"last_updated\": \"$LAST_UPDATED\"}" > last-updated.json
