# iOS Skeleton

This folder contains a React Native iOS skeleton for the Offline Pet app.

Included:
- `Podfile`
- `OfflinePet/Info.plist`
- `OfflinePet/AppDelegate.swift`
- `OfflinePet/LaunchScreen.storyboard`
- `OfflinePet/UsageMonitorModule.swift` + `OfflinePet/UsageMonitorModule.m`
- `OfflinePet/PrivacyInfo.xcprivacy`

## Next required local step

Generate/open the Xcode project/workspace and attach these files to the target:

1. `cd ios && pod install`
2. Open `OfflinePet.xcworkspace` in Xcode
3. Ensure `AppDelegate.swift`, `Info.plist`, storyboard, and UsageMonitor files are in target membership
4. Build and run on simulator/device

MVP policy: iOS remains soft-enforcement mode for app blocking.
