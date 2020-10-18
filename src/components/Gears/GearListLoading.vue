<template>
	<div class="gear-list-loading">
		<div class="gear-list-loading__title"></div>
		<Board>
			<MdcList>
				<GearListItemFake v-for="i in 3" :key="i" />
			</MdcList>
		</Board>
	</div>
</template>

<script>
import Board from '@components/Board';
import GearListItemFake from '@components/Gears/GearListItemFake';
import MdcList from '@components/MdcList';
export default {
	components: {
		Board,
		GearListItemFake,
		MdcList,
	},
}
</script>
