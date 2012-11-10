generate: *.html.part
	python generate.py

deploy: generate
	rsync  -r . cjdev:/var/www/deploy/mobile-site
