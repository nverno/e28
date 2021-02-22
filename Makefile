REMOTE=/var/www/html/e28

.PHONY: deploy-%
deploy-%: %
	npm run build --prefix "$(CURDIR)/$^"
	scp -r "$(CURDIR)/$^/dist" e28:${REMOTE}/$^
