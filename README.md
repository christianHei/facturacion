# Facturación - Aplicación con Angular
 
## Ver la aplicación en la web en desarrollo
ng serve

La aplicacíon se levanta por http://localhost:4200/

## Ver la aplicación en producción
ng build

## Construye la aplicación Angular
ng build --prod --aot

## Construye con Cordova para Android
cordova build android

## Inicia la apk en un dispositivo Android
cordova run android

## Emulador android para la aplicación
cordova emulate android

## Crear la aplicación

Esto creará una versión sin firmar de tu APK en plataforms/android/app/build/outputs/apk/release

cordova build --release android

Para auto-firmar nuestro APK necesitamos generar un almacén de claves.
El comando keytool le pedirá una contraseña y otros campos de certificado. Después de completar los campos, se generará un archivo de almacén de claves. ¡Almacene su almacén de claves con mucho cuidado!

keytool -genkey -v -keystore facturacion.keystore -alias facturacionapp -keyalg RSA -keysize 2048 -validity  10000

keytool -keystore facturacion.keystore -list -v

Luego tenemos que firmar el paquete de archivo java

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore facturacion.keystore D:\Proyectos\Angular\facturacion\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk facturacionapp

Un último paso obligatorio si desea cargar el APK en Play Store (Z ipalign es una herramienta proporcionada por el SDK de Android

zipalign -v 4 app-release-unsigned.apk app-release-signed.apk
