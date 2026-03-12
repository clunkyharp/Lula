#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(UsageMonitorModule, NSObject)
RCT_EXTERN_METHOD(getForegroundPackage:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
@end
