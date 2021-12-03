FROM node:latest

# 将当前目录移动到/usr/local/web/
ADD . /usr/local/web/
# 相当于cd ./app 进入/usr/local/web/目录
WORKDIR /usr/local/web/element-system
RUN echo 'deb http://mirrors.163.com/debian/ stretch main non-free contrib' > /etc/apt/sources.list &&\
    echo 'deb http://mirrors.163.com/debian/ stretch-updates main non-free contrib' >> /etc/apt/sources.list &&\
    echo 'deb http://mirrors.163.com/debian-security/ stretch/updates main non-free contrib' >> /etc/apt/sources.list &&\
    apt-get update && apt-get install -y \
    # node-sass依赖包
    gcc g++ python \
    vim \
    git \
    && rm -rf /var/lib/apt/lists/*

RUN true \
    && npm config set registry https://registry.npm.taobao.org && \
    npm install
EXPOSE 8080
CMD [ "npm", "run", "serve" ]
# RUN git config --global user.name "Your Name" \
#     && git config --global user.email "Your Email" \
#     && git clone https://gitee.com/XXXX/XXX.git
# WORKDIR /usr/local/vue/XXX
# RUN npm i