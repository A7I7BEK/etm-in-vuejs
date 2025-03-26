export default function (permission) {
	return this.$store.state.permissionList.includes(permission);
};