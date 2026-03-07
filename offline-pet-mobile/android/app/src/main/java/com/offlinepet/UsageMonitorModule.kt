package com.offlinepet

import android.app.AppOpsManager
import android.app.usage.UsageStatsManager
import android.content.Context
import android.os.Process
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class UsageMonitorModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  override fun getName(): String = "UsageMonitorModule"

  @ReactMethod
  fun getForegroundPackage(promise: Promise) {
    if (!hasUsageStatsPermission()) {
      promise.resolve(null)
      return
    }

    val usageStatsManager =
      reactApplicationContext.getSystemService(Context.USAGE_STATS_SERVICE) as UsageStatsManager
    val end = System.currentTimeMillis()
    val start = end - 60_000
    val stats = usageStatsManager.queryUsageStats(UsageStatsManager.INTERVAL_DAILY, start, end)

    if (stats.isNullOrEmpty()) {
      promise.resolve(null)
      return
    }

    val top = stats.maxByOrNull { it.lastTimeUsed }
    promise.resolve(top?.packageName)
  }

  private fun hasUsageStatsPermission(): Boolean {
    val appOps = reactApplicationContext.getSystemService(Context.APP_OPS_SERVICE) as AppOpsManager
    val mode =
      appOps.unsafeCheckOpNoThrow(
        AppOpsManager.OPSTR_GET_USAGE_STATS,
        Process.myUid(),
        reactApplicationContext.packageName
      )
    return mode == AppOpsManager.MODE_ALLOWED
  }
}
