<template>
	<view >
		<u-navbar leftText="返回" :fixed="true" :placeholder="true" bgColor="transparent" :autoBack="false" :safeAreaInsetTop="true"
			@leftClick="$mHelper.goBack()" leftIconColor="#363636" leftIcon="arrow-leftward" leftIconSize="25"
			:titleStyle="{color: '#363636',fontSize: '32rpx'}">
		</u-navbar>
		<view>
			<image id="canvasImg" :src="imgUrl" mode="aspectFit top"  style="width: 750rpx;height: 80vh;"
				@longpress="handleSave"></image>
		</view>
		<!-- <image id="canvasImg"  :src="imgUrl" mode="scaleToFill" style="width: 750rpx;height: 100vh;" @longpress="handleSave"></image> -->
		<!-- <u-image :showLoading="true" @longpress="saveImage" :src="imgUrl" width="750rpx" height="100vh" mode="scaleToFill"></u-image> -->
	</view>
</template>

<script>
	import {
		getShareImg
	} from '@/api/system/user.js'
	// #ifdef H5
	import html2canvas from 'html2canvas';
	// #endif
	export default {
		data() {
			return {
				imgUrl: '',
				show: false,
				list: [{
						name: '长按保存图片',
						color: '#ffaa7f',
						fontSize: '20'
					},

				],
			};
		},
		onLoad() {
			this.getImgUrl()
		},
		methods: {
			getImgUrl() {
				getShareImg().then((res) => {
					this.imgUrl = res.imgurl
				})
			},
			handleSave() {
				uni.showModal({
					title: '分享',
					content: '保存二维码至相册',
					confirmText: '确定',
					cancelText: '取消',
					success: (res) => {
						
						if (res.confirm) {
							
							// #ifdef H5
							this.transImage()
							// #endif
							// #ifdef APP-VUE
							this.saveImage()
							// #endif
							
						}
					}
				})
			},
			saveImage() {
				console.log(this.imgUrl)
				// #ifdef APP-PLUS
				uni.downloadFile({
					url: this.imgUrl,
					success: (res) => {
						if (res.statusCode === 200) {
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success: () => {
									uni.showToast({
										title: '保存成功',
										icon: 'success',
										duration: 2000,
									});
								},
								fail: (err) => {
									uni.showToast({
										title: '保存失败',
										icon: 'none',
										duration: 2000,
									});
									console.error('保存失败', err);
								},
							});
						} else {
							uni.showToast({
								title: '下载图片失败',
								icon: 'none',
								duration: 2000,
							});
							console.error('下载图片失败', res);
						}
					},
					fail: (err) => {
						uni.showToast({
							title: '下载图片失败',
							icon: 'none',
							duration: 2000,
						});
						console.error('下载图片失败', err);
					},
				});
				// #endif
			},
			transImage() {
				
				uni.showLoading({
					title: '正在转换...'
				});
				//点击保存按钮的回调事件
				const element = document.getElementById('canvasImg'); // 需要导出的页面
				html2canvas(element, {
					allowTaint: true,
					useCORS: true
				}).then((canvas) => {
					// imgUrl 是图片的 base64格式 代码 png 格式
					const imgUrl = canvas.toDataURL('image/png');
					console.log(imgUrl);
					// screenshot.value = imgUrl;
					//下载图片的功能。
					this.downloadIamge(imgUrl, 'plantCardImg.png');
					uni.hideLoading();
				});
				// }
			},
			downloadIamge(imgsrc, name) {
				//下载图片地址和图片名
				const image = new Image();
				// 解决跨域 Canvas 污染问题
				image.setAttribute('crossOrigin', 'anonymous');
				image.onload = function() {
					let canvas = document.createElement('canvas');
					canvas.width = image.width;
					canvas.height = image.height;
					const context = canvas.getContext('2d');
					context.drawImage(image, 0, 0, image.width, image.height);
					const url = canvas.toDataURL('image/png'); //得到图片的base64编码数据
					const a = document.createElement('a'); // 生成一个a元素
					const event = new MouseEvent('click'); // 创建一个单击事件
					a.download = name || 'photo'; // 设置图片名称
					a.href = url; // 将生成的URL设置为a.href属性
					a.dispatchEvent(event); // 触发a的单击事件
					uni.showToast({
						title:'图片已保存',
						icon: 'success'
					})
				};
				image.src = imgsrc;
			}

		},
	}
</script>

<style lang="scss">

</style>