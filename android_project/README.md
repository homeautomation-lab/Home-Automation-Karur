# Home Control Hub - Android Wrapper

This is an Android Studio project that wraps the Lumina/OS web application into a native Android app using a WebView.

## Instructions for completion:

1.  **Add Firebase Configuration**:
    *   Place your `google-services.json` file inside the `app/` directory.
2.  **Sync Gradle**:
    *   Open the project in Android Studio and click "Sync Project with Gradle Files".
3.  **Add Firebase SDK (Optional)**:
    *   If you need native Firebase features, you can now add the dependencies to `app/build.gradle.kts`. However, since your web app already handles Firebase, this may not be necessary unless you want native analytics or messaging.
4.  **SHA-1 Fingerprint**:
    *   Generate your SHA-1 fingerprint and add it to your Firebase project console.
5.  **Build**:
    *   Go to `Build > Build Bundle(s) / APK(s) > Build APK(s)`.

## Project Details:
- **App Name**: Home Control Hub
- **Package**: com.lumina.home
- **Web Content**: Loaded from `app/src/main/assets/`
