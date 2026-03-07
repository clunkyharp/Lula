import Foundation

@objc(UsageMonitorModule)
class UsageMonitorModule: NSObject {
  @objc
  func getForegroundPackage(_ resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    // iOS soft enforcement mode: no hard app blocking in MVP.
    resolve(nil)
  }
}
