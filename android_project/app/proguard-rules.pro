# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in C:\Users\ASWIN_VK\AppData\Local\Android\Sdk/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.

# For more details, see
#   http://developer.android.com/guide/developing/tools-proguard.html

# Keep the WebView settings and interfaces
-keepclassmembers class fqcn.of.javascript.interface.for.webview {
   public *;
}
