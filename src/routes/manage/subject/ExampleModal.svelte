<script lang="ts"> 
    import { getModalStore, type ModalComponent } from '@skeletonlabs/skeleton';
	import type { SvelteComponent } from 'svelte';
    import type { PageData, ActionData } from './$types'

    const modalStore = getModalStore();

    const ADD_STUDENT_MODAL: number    = 1,
          EDIT_STUDENT_MODAL: number   = 2,
          DELETE_STUDENT_MODAL: number = 3;
        
    export let parent: SvelteComponent;

    let labels: any = [];
    let inputNames: any = [];
    let studentData: any = [];
    let type: any = $modalStore[0].meta.type;
    let modalTitle: any;

    if (type === EDIT_STUDENT_MODAL) {
        modalTitle = "Chỉnh sửa thông tin";
        studentData = [$modalStore[0].meta.data.student_id,
                       $modalStore[0].meta.data.full_name,
                       $modalStore[0].meta.data.date_of_birth,
                       $modalStore[0].meta.data.gender,
                       $modalStore[0].meta.data.address,
                       $modalStore[0].meta.data.phone_number,
                       $modalStore[0].meta.data.class_name,          
                       $modalStore[0].meta.data.school_year,
                       $modalStore[0].meta.data.id,]
        labels = ['MSV', 'Họ tên', 'Ngày sinh', 'Giới tính', 'Địa chỉ', 'Số điện thoại', 'Khoá', 'Lớp'];
        inputNames = ['student_id', 'full_name', 'date_of_birth', 'gender', 'address', 'phone_number', 'school_year', 'class_name'];
    }
    else if (type === ADD_STUDENT_MODAL) {
        modalTitle = "Thêm thông tin";
        labels = ['MSV, Họ tên, Ngày sinh, Giới tính, Địa chỉ, Số điện thoại, Lớp, Khoá, Email, Mật khẩu'];
    }

    const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';

</script>				

{#if $modalStore[0]}
	<div class="{cBase}">
		<header class={cHeader}>{modalTitle}</header>
		<article></article>

		<form class="{cForm}" method="POST" action="/">
            {#each labels as label, i}
                <label class="label">
                    <span>{label}</span>
                    {#if inputNames[i] === 'gender'}
                        <select class="select" name={inputNames[i]} 
                        value={studentData[i] ? "1" : "0"} required>
                            <option value="0">Nam</option>
                            <option value="1">Nữ</option>
                            
                        </select>
                    {:else if inputNames[i] === 'date_of_birth'}
                        <input class="input" type="date" name={inputNames[i]} 
                        bind:value={studentData[i]} required/>
                    {:else}
                        <input class="input" type="text" name={inputNames[i]}
                        bind:value={studentData[i]} placeholder="Không có" required/>
                    {/if}
                </label>
            {/each}

            <!-- Sorry for this workaround. No others solutions could be found. -->
            <input name="id" class="input" type="text"
                value={studentData[8]} hidden/>

            <div class="modal-footer {parent.regionFooter}">
                <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>Huỷ</button>
                <button class="btn {parent.buttonPositive}" formaction="?/update">Lưu</button>
            </div>
		</form>
		<!-- prettier-ignore -->
	</div>
{/if}
						