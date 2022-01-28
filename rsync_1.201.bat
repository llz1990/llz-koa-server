:: 一键部署服务器脚本
@ECHO OFF

SETLOCAL
rem 当前路径
SET CWRSYNCHOME=%~dp0

IF NOT EXIST %CWRSYNCHOME%\home\%USERNAME%\.ssh MKDIR %CWRSYNCHOME%\home\%USERNAME%\.ssh

SET CWOLDPATH=%PATH%
SET PATH=%CWRSYNCHOME%\bin;%PATH%
SET RHOST=192.168.1.201
SET RPORT=22
SET RUSER=ubuntu
SET RPKEY=../key/testubuntu.txt
rem 获取得原始的路径
SET RSOURCE=%CWRSYNCHOME%../../
rem 将路径中冒号删除
set "RSOURCE=%RSOURCE::=%"
rem 将路径中的\变为/
set "RSOURCE=/cygdrive/%RSOURCE:\=/%"
SET RDEST=/data/xn-lr-server
chmod 400 %RPKEY%

rem rsync -avz --progress --chmod=Du=rwx,Dog=rx,Fug=rw,Fo=r --exclude ".DS_Store" --exclude ".git" --exclude ".vscode" --exclude "node_modules" --exclude "cygdrive" --exclude "app" --exclude "runtime" --exclude "logs" -e "ssh -l%RUSER% -p%RPORT% -i%RPKEY%" -- %RSOURCE% %RHOST%:%RDEST%

ssh -l %RUSER% -p %RPORT% -i %RPKEY% %RHOST% "cd %RDEST%/;npm run build"
ssh -l %RUSER% -p %RPORT% -i %RPKEY% %RHOST% "cd %RDEST%/;npm install -d"
ssh -l %RUSER% -p %RPORT% -i %RPKEY% %RHOST% "cd %RDEST%/;npm run start"


rem ssh 命令的帮助说明
rem usage: ssh [-1246AaCfGgKkMNnqsTtVvXxYy] [-b bind_address] [-c cipher_spec]
rem            [-D [bind_address:]port] [-E log_file] [-e escape_char]
rem            [-F configfile] [-I pkcs11] [-i identity_file]
rem            [-L address] [-l login_name] [-m mac_spec]
rem            [-O ctl_cmd] [-] [-p port]
rem            [-Q cipher | cipher-auth | mac | kex | key]
rem            [-R address] [-S ctl_path] [-W host:port]
rem            [-w local_tun[:remote_tun]] [user@]hostname [command]
rem 

rem 在bin目录下，输入命令 测试
rem ssh -l ubuntu -p 22 -i ../../key/testubuntu.txt 192.168.1.201 "ls -l"