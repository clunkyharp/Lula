@ECHO OFF
SET DIR=%~dp0
SET WRAPPER_JAR=%DIR%\gradle\wrapper\gradle-wrapper.jar

IF EXIST "%WRAPPER_JAR%" (
  java -classpath "%WRAPPER_JAR%" org.gradle.wrapper.GradleWrapperMain %*
  EXIT /B %ERRORLEVEL%
)

WHERE gradle >NUL 2>NUL
IF %ERRORLEVEL%==0 (
  gradle %*
  EXIT /B %ERRORLEVEL%
)

ECHO Gradle wrapper jar is missing and system gradle is not installed.
ECHO Run "gradle wrapper" in android/ or install Gradle.
EXIT /B 1
