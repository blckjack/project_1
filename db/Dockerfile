FROM alpine:3.7

RUN apk -v --update add \
    mongodb \
    mongodb-tools \
	groff \
    less \
    python \
    py-pip && \
	pip install awscli && \
	apk --purge -v del py-pip && \
    rm /usr/bin/mongoperf

ADD helpers /root
