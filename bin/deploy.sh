#!/usr/bin/env bash
#
# Script for deploying hugo generated pages to Github

set -e

#
## Config

# Set the English locale for the `date` command.
export LC_TIME=en_US.UTF-8
MSG_COMMIT="Site rebuild $(date)"
BRANCH_DEPLOY="master"
DIR_SCRIPT=$(dirname "$0")

#
## Functions

msg() {
    printf "\033[1;32m :: %s\n\033[0m" "$1"
}

#
## Tasks

cd ${DIR_SCRIPT}/..
msg "Switched to repo root $(pwd)"

if [[ $(git status -s) ]]; then
    msg "The working directory is dirty, please commit or stash any pending changes"
    exit 1;
fi

msg "Deleting old publication"
rm -rf public
mkdir public
git worktree prune
rm -rf .git/worktrees/public/

msg "Checking out ${BRANCH_DEPLOY} branch into public"
git worktree add -B ${BRANCH_DEPLOY} public origin/${BRANCH_DEPLOY}

msg "Removing existing files"
rm -rf public/*

msg "Generating site"
hugo

msg "Updating ${BRANCH_DEPLOY} branch (commit & push)"
cd public && git add --all && git commit -m "${MSG_COMMIT}" && git push
