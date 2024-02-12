---
title: Docker로 Palworld 서버 열기 (ARM64) Ver. 2
date: 2024-02-09 20:33:23 +0900
last_modified_at: 2024-02-09 21:34:54 +0900
categories: [Game, Palworld]
tags: [GitHub, ARM64, Issue]
---

[Palworld 서버를 24시간 열어둘 경우 생기는 문제](/posts/palworld-24-hours-server-bug/){: .post-infobox}
어제 위 글을 작성하고 또 무슨 기능이 생겼나 구경하려고 들어갔는데.. ARM 버전이 생겼다? 그것도 FEX-Emu를 사용하지 않는다??

이게 되면 바로 갈아탈 마음에 바로 사용해 봤다.

## 실행
`docker-compose.yml` 파일 작성 후 `docker compose up -d` 실행
```yaml
version: "3.9"
services:
  palworld:
    container_name: palworld
    restart: unless-stopped
    stop_grace_period: 30s
    image: thijsvanloef/palworld-server-docker:latest-arm64
    ports:
      - 8211:8211/udp
      - 27015:27015/udp
    env_file:
      - .env
      - settings.env
    environment:
      - PUID=1001
      - PGID=1001
      - MULTITHREADING=true
      - UPDATE_ON_BOOT=true
      - TZ=Asia/Seoul
    volumes:
      - ./server:/palworld
    networks:
      games:
        ipv4_address: 172.16.11.11
networks:
  games:
    name: games
    external: true
```
[이 글](/posts/palworld-server-docker/)에서 image 값 끝에 `-arm64` 추가한 것 외엔 차이가 없다.  
PUID, PGID는 [클라우드로 옮기면서](/posts/palworld-server-docker-arm64/#docker-composeyml) 변경한 것.

## 문제 발생
처음엔 잘 되는가 싶더니 컨테이너를 그냥 재시작만 했는데 에러가 났다.

`docker logs -f palworld`로 확인한 결과 재시작을 할 때마다 정상적으로 돌아갈 때도 있고, 아래처럼 로그가 찍히면서 혼자 재시작을 하기도 한다.
```
...
*****STARTING SERVER*****
./PalServer-arm64.sh -port=8211 -queryport=27015 EpicApp=PalServer -useperfthreads -NoAsyncLoadingThread -UseMultithreadForDS
time="2024-02-08T20:20:05+09:00" level=info msg="read crontab: /home/steam/server/crontab"
[S_API] SteamAPI_Init(): Loaded local 'steamclient.so' OK.
Shutdown handler: initalize.
Increasing per-process limit of core file size to infinity.
- Existing per-process limit (soft=18446744073709551615, hard=18446744073709551615) is enough for us (need only 18446744073709551615)
CAppInfoCacheReadFromDiskThread took 24 milliseconds to initialize
Steam Service Error: Failed to get Steam Service Start function
Setting breakpad minidump AppID = 2394010
[S_API FAIL] Tried to access Steam interface SteamUser021 before SteamAPI_Init succeeded.
[S_API FAIL] Tried to access Steam interface SteamFriends017 before SteamAPI_Init succeeded.
[S_API FAIL] Tried to access Steam interface STEAMAPPS_INTERFACE_VERSION008 before SteamAPI_Init succeeded.
[S_API FAIL] Tried to access Steam interface SteamNetworkingUtils004 before SteamAPI_Init succeeded.
free(): invalid next size (normal)
Signal 6 caught.
Malloc Size=262146 LargeMemoryPoolOffset=262162
Malloc Size=131160 LargeMemoryPoolOffset=393352
Malloc Size=131160 LargeMemoryPoolOffset=524536
LogPakFile: Display: Found Pak file ../../../Engine/Programs/CrashReportClient/Content/Paks/CrashReportClient.pak attempting to mount.
LogPakFile: Display: Mounting pak file ../../../Engine/Programs/CrashReportClient/Content/Paks/CrashReportClient.pak.
LogPakFile: Display: Mounted Pak file '../../../Engine/Programs/CrashReportClient/Content/Paks/CrashReportClient.pak', mount point: '../../../Engine/'
LogICUInternationalization: ICU TimeZone Detection - Raw Offset: +9:00, Platform Override: ''
LogInit: Build: ++UE5+Release-5.1-CL-0
LogInit: Engine Version: 5.1.1-0+++UE5+Release-5.1
LogInit: Compatible Engine Version: 5.1.0-0+++UE5+Release-5.1
LogInit: Net CL: 0
LogInit: OS: Debian GNU/Linux 11 (bullseye) (5.15.0-1052-realtime), CPU: Box64 on Neoverse-N1 @1000 MHz, GPU: UnknownVendor PCI-id: 108e-0010
LogInit: Compiled (64-bit): Dec 31 2023 20:12:22
LogInit: Compiled with Clang: 13.0.1 (https://github.com/llvm/llvm-project 75e33f71c2dae584b13a7d1186ae0a038ba98838)
LogInit: Build Configuration: Shipping
LogInit: Branch Name: ++UE5+Release-5.1
LogInit: Command Line:  -Abslog="/palworld/Pal/Saved/Logs/Pal-CRC.log" -Unattended -ImplicitSend "/palworld/Pal/Saved/Crashes/crashinfo-Pal-pid-111-AE37D7ED12904D579713C0111B657EBB/" -unattended
LogInit: Base Directory: /palworld/Engine/Binaries/Linux/
LogInit: Allocator: Mimalloc
LogInit: Installed Engine Build: 1
LogInit: Presizing for max 100000 objects, including 0 objects not considered by GC, pre-allocating 0 bytes for permanent pool.
LogInit: Object subsystem initialized
LogConfig: Applying CVar settings from Section [ConsoleVariables] File [Engine]
[2024.02.08-11.20.29:881][  0]LogInit: Unix hardware info:
[2024.02.08-11.20.29:881][  0]LogInit:  - we are the first instance of this executable
[2024.02.08-11.20.29:881][  0]LogInit:  - this process' id (pid) is 167, parent process' id (ppid) is 111
[2024.02.08-11.20.29:882][  0]LogInit:  - we are not running under debugger
[2024.02.08-11.20.29:882][  0]LogInit:  - machine network name is 'a4f09a0272ae'
[2024.02.08-11.20.29:882][  0]LogInit:  - user name is 'steam' (steam)
[2024.02.08-11.20.29:883][  0]LogInit:  - we're logged in locally
[2024.02.08-11.20.29:883][  0]LogInit:  - we're running with rendering
[2024.02.08-11.20.29:883][  0]LogInit:  - CPU: GenuineIntel 'Box64 on Neoverse-N1 @1000 MHz' (signature: 0x601)
[2024.02.08-11.20.29:883][  0]LogInit:  - Number of physical cores available for the process: 4
[2024.02.08-11.20.29:883][  0]LogInit:  - Number of logical cores available for the process: 4
[2024.02.08-11.20.29:883][  0]LogInit:  - Cache line size: 64
[2024.02.08-11.20.29:883][  0]LogInit:  - GPU Brand Info: UnknownVendor PCI-id: 108e-0010
[2024.02.08-11.20.29:883][  0]LogInit:  - Memory allocator used: Mimalloc
[2024.02.08-11.20.29:884][  0]LogInit:  - This binary is optimized with LTO: no, PGO: no, instrumented for PGO data collection: no
[2024.02.08-11.20.29:884][  0]LogInit:  - This is an internal build.
[2024.02.08-11.20.29:885][  0]LogCore: Skipped benchmarking clocks because the engine is running in a standalone program mode - CLOCK_MONOTONIC will be used.
[2024.02.08-11.20.29:885][  0]LogInit: Unix-specific commandline switches:
[2024.02.08-11.20.29:885][  0]LogInit:  -ansimalloc - use malloc()/free() from libc (useful for tools like valgrind and electric fence)
[2024.02.08-11.20.29:885][  0]LogInit:  -jemalloc - use jemalloc for all memory allocation
[2024.02.08-11.20.29:885][  0]LogInit:  -binnedmalloc - use binned malloc  for all memory allocation
[2024.02.08-11.20.29:885][  0]LogInit:  -filemapcachesize=NUMBER - set the size for case-sensitive file mapping cache
[2024.02.08-11.20.29:885][  0]LogInit:  -useksm - uses kernel same-page mapping (KSM) for mapped memory (OFF)
[2024.02.08-11.20.29:885][  0]LogInit:  -ksmmergeall - marks all mmap'd memory pages suitable for KSM (OFF)
[2024.02.08-11.20.29:885][  0]LogInit:  -preloadmodulesymbols - Loads the main module symbols file into memory (OFF)
[2024.02.08-11.20.29:885][  0]LogInit:  -sigdfl=SIGNAL - Allows a specific signal to be set to its default handler rather then ignoring the signal
[2024.02.08-11.20.29:885][  0]LogInit:  -crashhandlerstacksize - Allows setting crash handler stack sizes (204800)
[2024.02.08-11.20.29:885][  0]LogInit:  -noexclusivelockonwrite - disables marking files created by the engine as exclusive locked while the engine has them opened
[2024.02.08-11.20.29:885][  0]LogInit:  -httpproxy=ADDRESS:PORT - redirects HTTP requests to a proxy (only supported if compiled with libcurl)
[2024.02.08-11.20.29:886][  0]LogInit:  -reuseconn - allow libcurl to reuse HTTP connections (only matters if compiled with libcurl)
[2024.02.08-11.20.29:886][  0]LogInit:  -virtmemkb=NUMBER - sets process virtual memory (address space) limit (overrides VirtualMemoryLimitInKB value from .ini)
[2024.02.08-11.20.29:886][  0]LogInit:  - Physical RAM available (not considering process quota): 24 GB (23989 MB, 24564872 KB, 25154428928 bytes)
[2024.02.08-11.20.29:886][  0]LogInit:  - VirtualMemoryAllocator pools will grow at scale 1.4
[2024.02.08-11.20.29:886][  0]LogInit:  - MemoryRangeDecommit() will be a no-op (re-run with -vmapoolevict to change)
[2024.02.08-11.20.29:886][  0]LogInit:  - PageSize 4096
[2024.02.08-11.20.29:886][  0]LogInit:  - BinnedPageSize 65536
[2024.02.08-11.20.30:006][  0]LogUObjectArray: 419 objects as part of root set at end of initial load.
[2024.02.08-11.20.30:006][  0]LogUObjectAllocator: 89056 out of 0 bytes used by permanent object pool.
[2024.02.08-11.20.30:006][  0]LogUObjectArray: CloseDisregardForGC: 0/0 objects in disregard for GC pool
[2024.02.08-11.20.30:012][  0]LogPaths: Warning: No paths for game localization data were specifed in the game configuration.
[2024.02.08-11.20.30:013][  0]LogInit: Using OS detected language (en-US-POSIX).
[2024.02.08-11.20.30:013][  0]LogInit: Using OS detected locale (en-US-POSIX).
[2024.02.08-11.20.30:014][  0]LogInit: Warning: No paths for engine localization data were specifed in the engine configuration.
[2024.02.08-11.20.30:020][  0]LogTextLocalizationManager: No localization for 'en-US-POSIX' exists, so 'en' will be used for the language.
[2024.02.08-11.20.30:021][  0]LogTextLocalizationManager: No localization for 'en-US-POSIX' exists, so 'en' will be used for the locale.
[2024.02.08-11.20.30:026][  0]LogInit: Using OS detected language (en-US-POSIX).
[2024.02.08-11.20.30:026][  0]LogInit: Using OS detected locale (en-US-POSIX).
[2024.02.08-11.20.30:026][  0]LogTextLocalizationManager: No localization for 'en-US-POSIX' exists, so 'en' will be used for the language.
[2024.02.08-11.20.30:026][  0]LogTextLocalizationManager: No localization for 'en-US-POSIX' exists, so 'en' will be used for the locale.
[2024.02.08-11.20.30:043][  0]LogPackageLocalizationCache: Processed 2 localized package path(s) for 1 prioritized culture(s) in 0.004851 seconds
[2024.02.08-11.20.30:046][  0]CrashReportCoreLog: CrashReportClientVersion=1.0
[2024.02.08-11.20.30:046][  0]CrashReportCoreLog: CrashReportReceiver disabled
[2024.02.08-11.20.30:047][  0]CrashReportCoreLog: DataRouterUrl: https://o1291919.ingest.sentry.io/api/6513339/unreal/4a1a3921f51f4975b4cf8dd19022cb20/
[2024.02.08-11.20.30:080][  0]CrashReportCoreLog: Initial state = Unknown UploadState value
[2024.02.08-11.20.30:080][  0]CrashReportCoreLog: Initial state = Unknown UploadState value
[2024.02.08-11.20.30:096][  0]LogCrashDebugHelper: DepotName: //UE5/Release-5.1
[2024.02.08-11.20.30:096][  0]LogCrashDebugHelper: BuiltFromCL: 0
[2024.02.08-11.20.30:096][  0]LogCrashDebugHelper: EngineVersion: 5.1.1-0+++UE5+Release-5.1
[2024.02.08-11.20.30:096][  0]LogCrashDebugHelper: BuildVersion: ++UE5+Release-5.1-CL-0
[2024.02.08-11.20.31:081][  0]CrashReportCoreLog: Got 3 pending files to upload from 'crashinfo-Pal-pid-111-AE37D7ED12904D579713C0111B657EBB'
[2024.02.08-11.20.31:081][  0]CrashReportCoreLog: State change from Ready to SendingFiles
[2024.02.08-11.20.31:081][  0]CrashReportCoreLog: CompressAndSendData have 3 pending files
[2024.02.08-11.20.31:082][  0]CrashReportCoreLog: CompressAndSendData compressing 152 bytes ('/palworld/Pal/Saved/Crashes/crashinfo-Pal-pid-111-AE37D7ED12904D579713C0111B657EBB/CrashReportClient.ini')
[2024.02.08-11.20.31:083][  0]CrashReportCoreLog: CompressAndSendData compressing 4518 bytes ('/palworld/Pal/Saved/Crashes/crashinfo-Pal-pid-111-AE37D7ED12904D579713C0111B657EBB/CrashContext.runtime-xml')
[2024.02.08-11.20.31:083][  0]CrashReportCoreLog: CompressAndSendData compressing 385 bytes ('/palworld/Pal/Saved/Crashes/crashinfo-Pal-pid-111-AE37D7ED12904D579713C0111B657EBB/Diagnostics.txt')
[2024.02.08-11.20.31:206][  0]LogInit: Using libcurl 7.83.1
[2024.02.08-11.20.31:206][  0]LogInit:  - built for Linux
[2024.02.08-11.20.31:207][  0]LogInit:  - supports SSL with OpenSSL/1.1.1n
[2024.02.08-11.20.31:207][  0]LogInit:  - supports HTTP deflate (compression) using libz 1.2.12
[2024.02.08-11.20.31:207][  0]LogInit:  - other features:
[2024.02.08-11.20.31:207][  0]LogInit:      CURL_VERSION_SSL
[2024.02.08-11.20.31:207][  0]LogInit:      CURL_VERSION_LIBZ
[2024.02.08-11.20.31:207][  0]LogInit:      CURL_VERSION_IPV6
[2024.02.08-11.20.31:207][  0]LogInit:      CURL_VERSION_ASYNCHDNS
[2024.02.08-11.20.31:208][  0]LogInit:      CURL_VERSION_LARGEFILE
[2024.02.08-11.20.31:212][  0]LogInit:  CurlRequestOptions (configurable via config and command line):
[2024.02.08-11.20.31:212][  0]LogInit:  - bVerifyPeer = false  - Libcurl will NOT verify peer certificate
[2024.02.08-11.20.31:212][  0]LogInit:  - bUseHttpProxy = false  - Libcurl will NOT use HTTP proxy
[2024.02.08-11.20.31:213][  0]LogInit:  - bDontReuseConnections = false  - Libcurl will reuse connections
[2024.02.08-11.20.31:213][  0]LogInit:  - MaxHostConnections = 16  - Libcurl will limit the number of connections to a host
[2024.02.08-11.20.31:213][  0]LogInit:  - LocalHostAddr = Default
[2024.02.08-11.20.31:213][  0]LogInit:  - BufferSize = 65536
[2024.02.08-11.20.31:221][  0]CrashReportCoreLog: Sending HTTP request: https://o1291919.ingest.sentry.io/api/6513339/unreal/4a1a3921f51f4975b4cf8dd19022cb20/?AppID=CrashReporter&AppVersion=5.1.1-0%2B%2B%2BUE5%2BRelease-5.1&AppEnvironment=Release&UploadType=crashreports&UserID=-000003e9%7C%7C
[2024.02.08-11.20.31:563][  0]CrashReportCoreLog: OnProcessRequestComplete(), State=SendingFiles bSucceeded=1
[2024.02.08-11.20.31:563][  0]CrashReportCoreLog: State change from SendingFiles to SendingFiles
[2024.02.08-11.20.31:564][  0]CrashReportCoreLog: All uploads done
[2024.02.08-11.20.31:564][  0]CrashReportCoreLog: State change from SendingFiles to Finished
[2024.02.08-11.20.32:130][  0]CrashReportCoreLog: Final state (Receiver) = Finished
[2024.02.08-11.20.32:130][  0]CrashReportCoreLog: Final state (Receiver) = Unknown UploadState value
[2024.02.08-11.20.32:155][  0]LogCore: Engine exit requested (reason: CrashReportClientApp RequestExit)
[2024.02.08-11.20.32:155][  0]LogExit: Preparing to exit.
[2024.02.08-11.20.32:192][  0]LogExit: Object subsystem successfully closed.
[2024.02.08-11.20.32:196][  0]LogModuleManager: Shutting down and abandoning module HTTP (12)
[2024.02.08-11.20.32:233][  0]LogModuleManager: Shutting down and abandoning module SSL (11)
[2024.02.08-11.20.32:233][  0]LogModuleManager: Shutting down and abandoning module CrashDebugHelper (8)
[2024.02.08-11.20.32:237][  0]LogModuleManager: Shutting down and abandoning module CoreUObject (6)
[2024.02.08-11.20.32:237][  0]LogModuleManager: Shutting down and abandoning module PakFile (4)
[2024.02.08-11.20.32:238][  0]LogModuleManager: Shutting down and abandoning module RSA (3)
[2024.02.08-11.20.32:247][  0]LogExit: Exiting.
CommonUnixCrashHandler: Signal=6
Engine crash handling finished; re-raising signal 6 for the default handler. Good bye.
```
또는 18번 라인까지만 뜨면서 재시작이 안될 때도 있는데, 이건 그냥 멈춰버린 듯. 접속 시 타임아웃이 발생한다.

## 해결 (처음 올린 GitHub Issue)
그냥 원래 쓰던 빌드한 이미지로 쓸까 하다가 그냥 Issues에 한 번 올려나 봤다. [#](https://github.com/thijsvanloef/palworld-server-docker/issues/330)  
그리고 답글이 달렸고, 해결됐다!

해결 방법은
```yaml
    environment:
      - BOX64_DYNAREC_STRONGMEM=3
      - BOX64_DYNAREC_BIGBLOCK=0
      - BOX64_DYNAREC_BLEEDING_EDGE=0
```
이런 환경변수를 추가하는 것으로, 최종 `docker-compose.yml` 파일은 아래와 같다.

```yaml
version: "3.9"
services:
  palworld:
    container_name: palworld
    restart: unless-stopped
    stop_grace_period: 30s
    image: thijsvanloef/palworld-server-docker:latest-arm64
    ports:
      - 8211:8211/udp
      - 27015:27015/udp
    env_file:
      - .env
      - settings.env
    environment:
      - PUID=1001
      - PGID=1001
      - MULTITHREADING=true
      - UPDATE_ON_BOOT=true
      - TZ=Asia/Seoul
      - BOX64_DYNAREC_STRONGMEM=3
      - BOX64_DYNAREC_BIGBLOCK=0
      - BOX64_DYNAREC_BLEEDING_EDGE=0
    volumes:
      - ./server:/palworld
    networks:
      games:
        ipv4_address: 172.16.11.11
networks:
  games:
    name: games
    external: true
```

<br/>

FEX-Emu를 사용하지 않기 때문에 [이 문제](/posts/palworld-server-docker-arm64/#initsh)도 없으니 이제 나도 이 이미지의 모든 기능들을 귀찮게 새로 빌드하지 않고 쉽게 사용할 수 있게 됐다..!
