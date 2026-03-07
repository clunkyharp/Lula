import { NativeModules, Platform } from 'react-native';

const blockedBundleIds = [
  'com.instagram.android',
  'com.zhiliaoapp.musically',
  'com.google.android.youtube',
  'com.android.chrome',
  'com.apple.mobilesafari'
];

export interface ViolationSignal {
  violated: boolean;
  reason?: string;
}

interface UsageMonitorNative {
  getForegroundPackage(): Promise<string | null>;
}

const usageMonitor = NativeModules.UsageMonitorModule as UsageMonitorNative | undefined;

export async function detectViolation(currentBundleId?: string): Promise<ViolationSignal> {
  let packageId = currentBundleId;
  if (!packageId && usageMonitor?.getForegroundPackage) {
    packageId = (await usageMonitor.getForegroundPackage()) ?? undefined;
  }

  if (!packageId) {
    return { violated: false };
  }

  if (blockedBundleIds.includes(packageId)) {
    return {
      violated: true,
      reason:
        Platform.OS === 'ios'
          ? 'Soft enforcement: restricted app opened during focus.'
          : 'Restricted app opened during focus.'
    };
  }

  return { violated: false };
}
