<template>
	<view class="auth-identy">
		<u--form labelPosition="left" :model="form" :rules="rules" ref="uForm">
			<u-form-item label="姓名" labelWidth="100" prop="form.name" ref="item1">
				<u--input v-model="form.name" border="none" placeholder="请输入姓名"></u--input>
			</u-form-item>
			<u-form-item label="身份证号" labelWidth="100" prop="form.idcardNo" ref="item1">
				<u--input v-model="form.idcardNo" border="none" placeholder="请输入身份证号"></u--input>
			</u-form-item>
		</u--form>
		<view class="btn-box">
			<u-button @tap="navTo('pay-order')" type="primary" shape="circle" color="#388CEB" text="确认">
			</u-button>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					name: '',
					idcardNo: ''
				}
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #fff;
	}

	.auth-identy {
		padding: 40rpx;
	}

	/deep/ .uni-input-input {
		text-align: right;

		color: #010101;
	}

	/deep/ .uni-input-placeholder {
		text-align: right;
		font-size: 27rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #878787;
	}

	/deep/ .u-form-item__body__left__content__label[data-v-067e4733] {
		font-size: 27rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #010101;
	}

	.btn-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 430rpx;
	}

	/deep/ .u-button {
		width: 600.67rpx;
		height: 83.33rpx;
	}
</style>
