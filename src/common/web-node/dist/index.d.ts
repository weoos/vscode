
import './extends.d.ts';
import * as EventsAll from 'node:events';
import * as AssertAll from 'node:assert';
import * as StreamAll from 'node:stream';
import * as ZlibAll from 'browserify-zlib';
import * as BufferAll from 'buffer';
import { Buffer } from 'buffer';
import * as CryptoBrowserify from 'crypto-browserify';
import * as DomainBrowser from 'domain-browser';
import { EventEmitter } from 'events';
import * as Http from 'http-browserify';
import * as Https from 'https-browserify';
import _localforage from 'localforage';
import * as ConsoleAll from 'node:console';
import * as FSAll from 'node:fs';
import * as PathAll from 'node:path';
import * as ProcessAll from 'node:process';
import * as OsBrowserify from 'os-browserify';
import * as Punycode from 'punycode';
import * as QuerystringEs3 from 'querystring-es3';
import * as StringDecoder from 'string_decoder';
import * as TimersBrowserify from 'timers-browserify';
import * as TtyBrowserify from 'tty-browserify';
import * as Url from 'url';
import * as Util from 'util';
import * as VmBrowserify from 'vm-browserify';

declare const BaseModule: {
	Process: NodeJS.Process;
	Buffer: typeof BufferAll;
	Events: typeof EventsAll;
};
export type NodePath = typeof PathAll;
export type NodeConsole = typeof ConsoleAll;
export type NodeStream = typeof StreamAll;
export type NodeProcess = typeof ProcessAll;
export type NodeFS = typeof FSAll;
declare const modules: {
	assert: typeof AssertAll;
	zlib: typeof ZlibAll;
	buffer: typeof import("buffer");
	console: NodeConsole;
	constants: {
		O_RDONLY: number;
		O_WRONLY: number;
		O_RDWR: number;
		S_IFMT: number;
		S_IFREG: number;
		S_IFDIR: number;
		S_IFCHR: number;
		S_IFBLK: number;
		S_IFIFO: number;
		S_IFLNK: number;
		S_IFSOCK: number;
		O_CREAT: number;
		O_EXCL: number;
		O_NOCTTY: number;
		O_TRUNC: number;
		O_APPEND: number;
		O_DIRECTORY: number;
		O_NOFOLLOW: number;
		O_SYNC: number;
		O_SYMLINK: number;
		O_NONBLOCK: number;
		S_IRWXU: number;
		S_IRUSR: number;
		S_IWUSR: number;
		S_IXUSR: number;
		S_IRWXG: number;
		S_IRGRP: number;
		S_IWGRP: number;
		S_IXGRP: number;
		S_IRWXO: number;
		S_IROTH: number;
		S_IWOTH: number;
		S_IXOTH: number;
		E2BIG: number;
		EACCES: number;
		EADDRINUSE: number;
		EADDRNOTAVAIL: number;
		EAFNOSUPPORT: number;
		EAGAIN: number;
		EALREADY: number;
		EBADF: number;
		EBADMSG: number;
		EBUSY: number;
		ECANCELED: number;
		ECHILD: number;
		ECONNABORTED: number;
		ECONNREFUSED: number;
		ECONNRESET: number;
		EDEADLK: number;
		EDESTADDRREQ: number;
		EDOM: number;
		EDQUOT: number;
		EEXIST: number;
		EFAULT: number;
		EFBIG: number;
		EHOSTUNREACH: number;
		EIDRM: number;
		EILSEQ: number;
		EINPROGRESS: number;
		EINTR: number;
		EINVAL: number;
		EIO: number;
		EISCONN: number;
		EISDIR: number;
		ELOOP: number;
		EMFILE: number;
		EMLINK: number;
		EMSGSIZE: number;
		EMULTIHOP: number;
		ENAMETOOLONG: number;
		ENETDOWN: number;
		ENETRESET: number;
		ENETUNREACH: number;
		ENFILE: number;
		ENOBUFS: number;
		ENODATA: number;
		ENODEV: number;
		ENOENT: number;
		ENOEXEC: number;
		ENOLCK: number;
		ENOLINK: number;
		ENOMEM: number;
		ENOMSG: number;
		ENOPROTOOPT: number;
		ENOSPC: number;
		ENOSR: number;
		ENOSTR: number;
		ENOSYS: number;
		ENOTCONN: number;
		ENOTDIR: number;
		ENOTEMPTY: number;
		ENOTSOCK: number;
		ENOTSUP: number;
		ENOTTY: number;
		ENXIO: number;
		EOPNOTSUPP: number;
		EOVERFLOW: number;
		EPERM: number;
		EPIPE: number;
		EPROTO: number;
		EPROTONOSUPPORT: number;
		EPROTOTYPE: number;
		ERANGE: number;
		EROFS: number;
		ESPIPE: number;
		ESRCH: number;
		ESTALE: number;
		ETIME: number;
		ETIMEDOUT: number;
		ETXTBSY: number;
		EWOULDBLOCK: number;
		EXDEV: number;
		SIGHUP: number;
		SIGINT: number;
		SIGQUIT: number;
		SIGILL: number;
		SIGTRAP: number;
		SIGABRT: number;
		SIGIOT: number;
		SIGBUS: number;
		SIGFPE: number;
		SIGKILL: number;
		SIGUSR1: number;
		SIGSEGV: number;
		SIGUSR2: number;
		SIGPIPE: number;
		SIGALRM: number;
		SIGTERM: number;
		SIGCHLD: number;
		SIGCONT: number;
		SIGSTOP: number;
		SIGTSTP: number;
		SIGTTIN: number;
		SIGTTOU: number;
		SIGURG: number;
		SIGXCPU: number;
		SIGXFSZ: number;
		SIGVTALRM: number;
		SIGPROF: number;
		SIGWINCH: number;
		SIGIO: number;
		SIGSYS: number;
		SSL_OP_ALL: number;
		SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION: number;
		SSL_OP_CIPHER_SERVER_PREFERENCE: number;
		SSL_OP_CISCO_ANYCONNECT: number;
		SSL_OP_COOKIE_EXCHANGE: number;
		SSL_OP_CRYPTOPRO_TLSEXT_BUG: number;
		SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS: number;
		SSL_OP_EPHEMERAL_RSA: number;
		SSL_OP_LEGACY_SERVER_CONNECT: number;
		SSL_OP_MICROSOFT_BIG_SSLV3_BUFFER: number;
		SSL_OP_MICROSOFT_SESS_ID_BUG: number;
		SSL_OP_MSIE_SSLV2_RSA_PADDING: number;
		SSL_OP_NETSCAPE_CA_DN_BUG: number;
		SSL_OP_NETSCAPE_CHALLENGE_BUG: number;
		SSL_OP_NETSCAPE_DEMO_CIPHER_CHANGE_BUG: number;
		SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG: number;
		SSL_OP_NO_COMPRESSION: number;
		SSL_OP_NO_QUERY_MTU: number;
		SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION: number;
		SSL_OP_NO_SSLv2: number;
		SSL_OP_NO_SSLv3: number;
		SSL_OP_NO_TICKET: number;
		SSL_OP_NO_TLSv1: number;
		SSL_OP_NO_TLSv1_1: number;
		SSL_OP_NO_TLSv1_2: number;
		SSL_OP_PKCS1_CHECK_1: number;
		SSL_OP_PKCS1_CHECK_2: number;
		SSL_OP_SINGLE_DH_USE: number;
		SSL_OP_SINGLE_ECDH_USE: number;
		SSL_OP_SSLEAY_080_CLIENT_DH_BUG: number;
		SSL_OP_SSLREF2_REUSE_CERT_TYPE_BUG: number;
		SSL_OP_TLS_BLOCK_PADDING_BUG: number;
		SSL_OP_TLS_D5_BUG: number;
		SSL_OP_TLS_ROLLBACK_BUG: number;
		ENGINE_METHOD_DSA: number;
		ENGINE_METHOD_DH: number;
		ENGINE_METHOD_RAND: number;
		ENGINE_METHOD_ECDH: number;
		ENGINE_METHOD_ECDSA: number;
		ENGINE_METHOD_CIPHERS: number;
		ENGINE_METHOD_DIGESTS: number;
		ENGINE_METHOD_STORE: number;
		ENGINE_METHOD_PKEY_METHS: number;
		ENGINE_METHOD_PKEY_ASN1_METHS: number;
		ENGINE_METHOD_ALL: number;
		ENGINE_METHOD_NONE: number;
		DH_CHECK_P_NOT_SAFE_PRIME: number;
		DH_CHECK_P_NOT_PRIME: number;
		DH_UNABLE_TO_CHECK_GENERATOR: number;
		DH_NOT_SUITABLE_GENERATOR: number;
		NPN_ENABLED: number;
		RSA_PKCS1_PADDING: number;
		RSA_SSLV23_PADDING: number;
		RSA_NO_PADDING: number;
		RSA_PKCS1_OAEP_PADDING: number;
		RSA_X931_PADDING: number;
		RSA_PKCS1_PSS_PADDING: number;
		POINT_CONVERSION_COMPRESSED: number;
		POINT_CONVERSION_UNCOMPRESSED: number;
		POINT_CONVERSION_HYBRID: number;
		F_OK: number;
		R_OK: number;
		W_OK: number;
		X_OK: number;
		UV_UDP_REUSEADDR: number;
	};
	crypto: typeof CryptoBrowserify;
	domain: typeof DomainBrowser;
	os: typeof OsBrowserify;
	path: NodePath;
	process: NodeProcess;
	punycode: typeof Punycode;
	querystring: typeof QuerystringEs3;
	string_decoder: typeof StringDecoder;
	timers: typeof TimersBrowserify;
	tty: typeof TtyBrowserify;
	url: typeof Url;
	util: typeof Util;
	vm: typeof VmBrowserify;
	http: typeof Http;
	https: typeof Https;
};
declare const ModuleMap: {
	stream: NodeStream;
	events: typeof BaseModule.Events;
	fs: NodeFS;
} & typeof modules;
export type IFileType = "empty" | "file" | "dir" | "link";
export interface IFileStats {
	size: number;
	type: IFileType;
	isDirectory(): boolean;
	isFile(): boolean;
}
declare class StorageBackEnd {
	static Supported(): boolean;
	private root;
	init(): Promise<void>;
	read(path: string): Promise<Uint8Array | null>;
	write(path: string, data: Uint8Array): Promise<boolean>;
	private _writeFile;
	append(path: string, data: Uint8Array): Promise<boolean>;
	remove(path: string): Promise<boolean>;
	stat(path: string, recursive?: boolean): Promise<Pick<IFileStats, "size" | "type">>;
	private _isLinkFile;
	private traverse;
	traverseContent(callback: (path: string, content: Promise<Uint8Array | null>) => void, path?: string): Promise<void>;
	private _traverseContent;
	exist(path: string): Promise<boolean>;
	ls(path: string): Promise<string[] | null>;
	private existInDir;
	createLink(path: string, target: string, overwrite?: boolean): Promise<boolean>;
	createFile(path: string, content?: Uint8Array, overwrite?: boolean): Promise<boolean>;
	createDir(path: string, overwrite?: boolean): Promise<boolean>;
	private clearTarget;
	private _readFile;
	private getHandleByPath;
	private getParentByPath;
}
export type IDiskBankEnd = Pick<InstanceType<typeof StorageBackEnd>, "init" | "read" | "write" | "append" | "remove" | "stat" | "exist" | "ls" | "createDir" | "createFile" | "traverseContent">;
declare class SyncMiddleware {
	/**
	 * 内存中存在的存储所有文件的map，用于同步方法的实现
	 * 初始化时需要遍历存储的所有文件，将其加载到内存中
	 * 读写时需要同步
	 */
	private fileMap;
	init(backend: IDiskBankEnd): Promise<void>;
	read(key: string): Uint8Array | null;
	pureRead(key: string): Uint8Array;
	write(key: string, content: Uint8Array): boolean;
	append(key: string, content: Uint8Array): boolean;
	remove(path: string, onRemove?: (path: string) => void): boolean;
	private _removeSingle;
	stat(path: string, recursive?: boolean): {
		size: number;
		type: IFileType;
	};
	exist(path: string): boolean;
	ls(path: string): string[];
	createFile(path: string, content?: Uint8Array, overwrite?: boolean): boolean;
	createDir(path: string, overwrite?: boolean): boolean;
	getType(path: string): IFileType;
	traverse(path: string, callback: (data: {
		path: string;
		parent: string;
		name: string;
	}) => void, includeSelf?: boolean): void;
	traverseContent(callback: (path: string, content: Uint8Array | null) => void, path?: string): void;
}
declare class Link {
	backend: IDiskBankEnd;
	syncMiddleware: SyncMiddleware;
	constructor(backend: IDiskBankEnd, syncMiddleware: SyncMiddleware);
	get(path: string, data?: Uint8Array): Promise<string>;
	getSync(path: string, data?: Uint8Array): string;
	private _get;
}
declare class Zip {
	disk: Disk;
	constructor(disk: Disk);
	zip(paths: string[], target?: string): Promise<void>;
	private zipSingleFile;
	unzip(path: string, target?: string): Promise<void>;
	private unzipU8Arr;
	isZip(path: string): boolean;
	private isZipData;
	private getZipData;
}
export type IWatchEncoding = BufferEncoding | "buffer";
export interface IWatchOptions {
	persistent?: boolean;
	recursive?: boolean;
	encoding?: IWatchEncoding;
}
export type IWatchCallback = (event: "rename" | "change", path: string | Buffer) => void;
declare class FSWatcher extends EventEmitter<{
	change: [
		"rename" | "change",
		string | Buffer
	];
	error: [
		Error
	];
}> {
	watch: Watch;
	options: Required<IWatchOptions>;
	callback: IWatchCallback;
	path: string;
	constructor({ watch, options, callback, path, }: {
		watch: Watch;
		options: IWatchOptions;
		callback: IWatchCallback;
		path: string;
		enabled?: boolean;
	});
	static empty(): FSWatcher;
	close(): void;
	checkChange(path: string, type: "rename" | "change"): void;
}
export type IFileListener = (curr: IFileStats, prev: IFileStats) => void;
export interface IFileWatchOptions {
	bigint?: boolean;
	persistent?: boolean;
	interval?: number;
}
declare class Watch {
	disk: Disk;
	events: EventEmitter<[
		never
	]>;
	watchers: FSWatcher[];
	fileWatchers: Record<string, IFileListener[]>;
	constructor(disk: Disk);
	fireRename(path: string, isRemove?: boolean, emit?: boolean): void;
	fireChange(path: string, emit?: boolean): (() => void) | null;
	watch(path: string, options: IWatchOptions | IWatchEncoding | IWatchCallback, callback?: IWatchCallback): FSWatcher;
	watchFile(path: string, options: IFileWatchOptions | IFileListener, callback?: IFileListener): void;
	unwatchFile(path: string, callback?: IFileListener): void;
}
declare enum ChangType {
	Create = 0,
	Remove = 1,
	Change = 2
}
declare class SyncManager {
	tempChange: Record<string, ChangType>;
	timer: any;
	lastOprateId: string;
	disk: Disk;
	private offWatch;
	constructor(disk: Disk);
	checkUpdate(): Promise<void>;
	private writeFile;
	private useChanges;
	checkWriteChange(): Promise<void>;
	clear(): void;
}
export interface ICreateOpt {
	ensure?: boolean;
	overwrite?: boolean;
}
export type IDisk = Omit<IDiskBankEnd, "init" | "traverseContent"> & {
	createDir: (path: string, opt?: ICreateOpt) => Promise<boolean>;
	createLink: (path: string, target: string, opt?: ICreateOpt) => Promise<boolean>;
	createFile: (path: string, content: Uint8Array, overwrite?: boolean) => Promise<boolean>;
};
declare class Disk implements IDisk {
	current: string;
	backend: IDiskBankEnd;
	ready: Promise<void>;
	syncMiddleware: SyncMiddleware;
	clipboard: {
		paths: string[];
		isCut: boolean;
		active: boolean;
	};
	_link: Link;
	_zip: Zip;
	_watch: Watch;
	_sync: SyncManager;
	static instance: Disk;
	constructor();
	private init;
	fmtPath(path: string): string;
	size(path?: string): Promise<number>;
	cd(path: string): boolean;
	pwd(): string;
	copy(files: string | string[]): boolean;
	copySync(files: string | string[]): boolean;
	move(source: string, target: string): Promise<boolean>;
	moveSync(source: string, target: string): boolean;
	private _move;
	cut(files: string | string[]): Promise<boolean>;
	cutSync(files: string | string[]): boolean;
	_addToClipboard(files: string | string[], isCut?: boolean): boolean;
	paste(targetDir: string, renameMap?: Record<string, string>): Promise<{
		success: boolean;
		info: string;
	}>;
	pasteSync(targetDir: string, renameMap?: Record<string, string>): {
		success: boolean;
		info: string;
	};
	private _paste;
	copySingle(source: string, target: string): Promise<boolean>;
	copySingleSync(source: string, target: string): boolean;
	private _copySingle;
	readText(path: string): Promise<string | null>;
	readTextSync(path: string): string | null;
	read(path: string): Promise<Uint8Array | null>;
	readSync(path: string): Uint8Array | null;
	write(path: string, data: Uint8Array): Promise<boolean>;
	writeSync(path: string, data: Uint8Array): boolean;
	private _write;
	append(path: string, data: Uint8Array): Promise<boolean>;
	appendSync(path: string, data: Uint8Array): boolean;
	private _append;
	remove(path: string): Promise<boolean>;
	removeSync(path: string): boolean;
	private _remove;
	stat(path: string, recursive?: boolean): Promise<IFileStats>;
	statSync(path: string, recursive?: boolean): IFileStats;
	private _transStat;
	exist(path: string): Promise<boolean>;
	existSync(path: string): boolean;
	ls(path?: string): Promise<string[] | null>;
	lsSync(path?: string): string[] | null;
	createDir(path: string, opt?: ICreateOpt): Promise<boolean>;
	createDirSync(path: string, opt?: ICreateOpt): boolean;
	private _createDir;
	createFile(path: string, content?: Uint8Array | undefined, opt?: ICreateOpt): Promise<boolean>;
	createFileSync(path: string, content?: Uint8Array | undefined, opt?: ICreateOpt): boolean;
	private _createFile;
	createLink(path: string, target: string, opt?: ICreateOpt): Promise<boolean>;
	createLinkSync(path: string, target: string, opt?: ICreateOpt): boolean;
	zip(...args: Parameters<Zip["zip"]>): Promise<void>;
	unzip(...args: Parameters<Zip["unzip"]>): Promise<void>;
	isZip(...args: Parameters<Zip["isZip"]>): boolean;
	watch(...args: Parameters<Watch["watch"]>): FSWatcher;
	watchFile(...args: Parameters<Watch["watchFile"]>): void;
	unwatchFile(...args: Parameters<Watch["unwatchFile"]>): void;
	isDir(path: string): boolean;
	clear(): void;
	ensureParentPathSync(path: string): void;
	private _ensureParentPathSync;
	ensureParentPath(path: string): Promise<void>;
	private _ensureParentPathAsync;
	createFileContent(content: string, type?: IFileType): Uint8Array;
}
export declare function splitPathInfo(path: string): {
	path: string;
	parent: string;
	name: string;
};
export declare function splitPath(path: string): [
	string[],
	string
];
export declare function clearPath(path: string, tail?: boolean): string;
declare class CMD {
	static instance: CMD;
	disk: Disk;
	ready: Promise<void>;
	constructor();
	ls(path?: string): string[] | null;
	cd(path: string): boolean;
	pwd(): string;
	touch(path: string): Promise<boolean>;
	mkdir(path: string): Promise<boolean>;
	rmdir(path: string): Promise<boolean>;
	cp(src: string, dest: string): Promise<boolean>;
	mv(src: string, dest: string): Promise<boolean>;
	rm(path: string): Promise<boolean>;
	cat(path: string): string | null;
	more(path: string): string | null;
	less(path: string): string | null;
	head(path: string, line: number): string;
	tail(path: string, line: number): string;
	grep(path: string, reg: string | RegExp): string[];
	find(path: string, { name, type }?: {
		name?: string | RegExp;
		type?: IFileType;
	}): string[];
	zip(files: string[], target?: string): Promise<void>;
	unzip(path: string, target?: string): Promise<void>;
	tar(files: string[], target?: string): Promise<void>;
	du(path: string): number;
}
export const localforage = _localforage;
export type ModuleKey = keyof typeof ModuleMap;
export declare const cmd: CMD;
declare function require$1<T extends ModuleKey>(name: T): typeof ModuleMap[T];
export declare function getDisk(): Disk;
export declare let ready: Promise<void>;

export {
	require$1 as require,
};

export {};
