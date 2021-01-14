#!/bin/bash
DATE=$(date +"%Y%m%d")
zip -r "kpl-strapi-backup-$DATE.zip" kpl-data.db public/
