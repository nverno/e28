#
# Assumes e28 directory conventions:
# project directories named p1,p2,... and in root (e28) directory
#
# usage: make deploy-<project>
#
SSH_HOST       = e28
REMOTE_PATH    = /var/www/html/e28
PRODUCTION_DIR = dist

all: help
	@

.PHONY: deploy-% sync
sync:             ## Sync git repo on production
	$(info Syncing remote repo)
	ssh -t ${SSH_HOST} "cd ${REMOTE_PATH} && git pull && cd e28api && bash setup"

deploy-%: % sync  ## Builds and deploys project to production
	$(info Deploying $<...)
	npm run build --prefix "$(CURDIR)/$<"
	scp -r $(CURDIR)/$</${PRODUCTION_DIR} ${SSH_HOST}:${REMOTE_PATH}/$<

.PHONY: help
help:             ## Print this help message
	@grep -Ei '^#+ Usage' $(MAKEFILE_LIST) | awk -F'# ' '{printf "%s\n", $$2}'
	@grep -E '^[%a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
	sort | awk                                             \
	'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
