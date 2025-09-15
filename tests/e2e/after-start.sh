#!/bin/bash
# Create a new site in the multisite network for testing.
npx wp-env run cli -- wp site create --slug=test-site --title="Test Site" --email="test@example.com"

# Add the user 'admin' to the new site as an administrator.
npx wp-env run cli -- wp user set-role admin administrator --url=localhost:8888/test-site
