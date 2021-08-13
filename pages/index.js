import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
const ffmpeg = createFFmpeg({
	corePath: "https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js",
	log: true,
});

import React, { Component } from "react";

class index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			videoUrl: "",
		};
	}
	componentDidMount() {
		console.log(ffmpeg);
		(async () => {
			window.ffmpeg = ffmpeg;
			await ffmpeg.load();
			ffmpeg.FS("writeFile", "test.webm", await fetchFile("https://wedios-live.s3.amazonaws.com/shared/5caef7b56cdf86bf1a952745f7b9023c.webm"));
			await ffmpeg.run("-i", "test.webm", "test.mp4");
			// await fs.promises.writeFile("./test.mp4", ffmpeg.FS("readFile", "test.mp4"));
			let _uInt8array = ffmpeg.FS("readFile", "test.mp4");
			let mp4Blob = new Blob([_uInt8array.buffer]);
			console.log(mp4Blob);
			let blobUrl = URL.createObjectURL(mp4Blob);
			this.setState({
				videoUrl: blobUrl,
			});
			// process.exit(0);
		})();
	}
	render() {
		return (
			<div>
				<video src={this.state.videoUrl}></video>
			</div>
		);
	}
}

export default index;
