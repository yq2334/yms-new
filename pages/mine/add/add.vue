<template>
	<view class="add">
		<u--form labelPosition="left" :model="form" ref="form1">
			<u-form-item labelWidth="180" label="姓名" prop="name" borderBottom ref="item1">
				<u--input v-model="form.name" border="none" placeholder="请输入姓名 ">
				</u--input>
			</u-form-item>
			<u-form-item labelWidth="180" label="身份证" prop="name" borderBottom ref="item1">
				<u--input v-model="form.idCardNo" border="none" placeholder="请输入身份证号码 ">
				</u--input>
			</u-form-item>

			<u-form-item labelWidth="180" label="与本人关系" prop="relative" borderBottom
				@click="showRelative = true; hideKeyboard()" ref="item1">
				<u--input v-model="form.relative" disabled  placeholder="请选择与本人关系" border="none"></u--input>
				<u-icon slot="right" name="arrow-down"></u-icon>
			</u-form-item>
		</u--form>
		<u-action-sheet :show="showRelative" :actions="actions" title="请选择与本人关系" @close="showRelative = false"
			@select="relativeSelect">
		</u-action-sheet>
		</u--form>
		<u-button @tap="" type="primary" color="#388CEB" size="large" text="确认添加">
		</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					name: '',
					idCardNo: '',
					relative: '父母',
				},
				showRelative: false,
				actions: [{
						name: '本人',
					},
					{
						name: '妻子',
					},
					{
						name: '父母',
					},
					{
						name: '子女',
					},
				],
			}
		},
		methods: {
			relativeSelect(e) {
				this.form.relative = e.name
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #fff;
	}

	.add {}
	/deep/ .u-form-item__body{
		padding: 20rpx 30rpx;
	}
	.uni-input-placeholder{
		color: #707070 !important;
		font-size: 33rpx;
	}
	/deep/ .u-form-item__body__left__content__label{
		font-size: 33rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #000000;
	}
	.uni-input-input:disabled{
		background: #fff !important;
	}
	/deep/ .u-button--large {
			
			margin-top: 120rpx;
			height: 91rpx;
			background: #388CEB;
			border-radius: 7rpx;
			color: #FFFCFC;
			font-size: 27rpx;
			width: 606rpx;
			
		}
</style>
