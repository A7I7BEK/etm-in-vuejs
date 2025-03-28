<template>
	<div
		class="modal fade board-modal__window"
		id="board-modal"
	>
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">

				<div
					class="board-mw__main"
					v-if="$store.state.taskModalData"
				>
					<task-modal-left></task-modal-left>


					<task-modal-right></task-modal-right>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
import TaskModalLeft from "./TaskModalLeft/index";
import TaskModalRight from "./TaskModalRight/index";


export default {
	name: "TaskModal",
	components: {
		TaskModalRight,
		TaskModalLeft,
	},
	props: {},
	data() {
		return {};
	},
	watch: {
		'$store.state.taskModalId'(val) {
			if (val > 0) {
				this.GetTaskDetails(val);

				$('#board-modal').modal('show');
			}
		},
	},
	mounted() {
		if (this.$route.params.taskId) {
			this.$store.state.taskModalId = +this.$route.params.taskId;
		}

		$('#board-modal').on('hidden.bs.modal', (e) => {
			this.$store.state.taskModalData = null;
			this.$store.state.taskModalId = 0;
		});
	},
	methods: {
		GetTaskDetails(id) {
			this.$api
				.get('/tasks/' + id + '/details')
				.then(response => {
					this.$store.state.taskModalData = response.data.data;
				});
		}
	},
};
</script>