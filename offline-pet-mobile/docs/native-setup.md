# Native Usage Monitoring Setup

## Android

1. Add permission in `android/app/src/main/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.PACKAGE_USAGE_STATS" tools:ignore="ProtectedPermissions" />
```

2. Register `UsageMonitorModule` in your React Package (or via TurboModule config).
   For classic RN setup, add `UsageMonitorPackage()` in `MainApplication#getPackages()`:

```kotlin
override fun getPackages(): List<ReactPackage> {
  return PackageList(this).packages.apply {
    add(UsageMonitorPackage())
  }
}
```

   A package implementation is available at `android/app/src/main/java/com/offlinepet/UsageMonitorPackage.kt`.
3. Ask user to grant usage access in Android settings.

## iOS

MVP uses soft enforcement. iOS cannot reliably read other foreground apps without Screen Time entitlements.
If you later enable Screen Time APIs, add FamilyControls/ManagedSettings capabilities and wire policy updates from JS.
