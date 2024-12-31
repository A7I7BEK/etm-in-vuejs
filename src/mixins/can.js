export default function (permission) {
	return !!this.$store.state.permissionList.find(item => item.codeName === permission);
};