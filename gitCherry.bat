@echo off
setlocal enabledelayedexpansion

set /p nameRepo="Enter your repo name, enter empty to set name is company: "
IF "%nameRepo%"=="" set nameRepo="company"

for /f "tokens=1" %%a in ('git remote -v') do (
    if /i "%%a"==%nameRepo% (
        echo "%%a"==%nameRepo%
        set exists="on"
    )
)

if not defined exists (
    set /p url="Enter your url: "
    IF "%url%"=="" set url="git@git.apuscorp.com:business/saas/erp/web-app/company-service.git"
    git remote add !nameRepo! !url!
)

git fetch !nameRepo!

set /p commit="Enter your commit need to cherry pick: "
:loop
IF NOT "!commit!"=="" GOTO endloop
echo Please enter commit not empty!!!.
set /p commit="Enter your commit need to cherry pick: "
GOTO loop
:endloop
git cherry-pick !commit!
pause