FROM amazonlinux:2

RUN yum clean all -y && yum update -y

# install node 16
RUN curl -sL https://rpm.nodesource.com/setup_16.x | bash -
RUN yum install -y nodejs

WORKDIR /code-challenge-service
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 4001
CMD npm run server