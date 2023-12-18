<script lang="ts"> 
    import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import type { SvelteComponent } from 'svelte';
	import type { ActionData } from './$types';
    import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';

    const modalStore = getModalStore();
    const toastStore = getToastStore();

    const ADD_STUDENT_MODAL: number    = 1,
          EDIT_STUDENT_MODAL: number   = 2,
          DELETE_STUDENT_MODAL: number = 3;
    
    const ID_INDEX: number = 10;
        
    export let parent: SvelteComponent;
    export let form: ActionData;

    let labels: any = [];
    let inputNames: any = [];
    let studentData: any = [];
    let studentID: any;
    let type: any = $modalStore[0].meta.type;
    let modalTitle: any;

    function formEnhance() {
        return async () => {
            console.log(form);
            if (form?.error) {
                toastStore.trigger( {
                    message: 'Không thể xử lí yêu cầu',
                    background: 'variant-filled-error',
                    hideDismiss: true
                } )
            }
            else {
                toastStore.trigger( {
                    message: 'Thao tác thành công',
                    background: 'variant-filled-secondary',
                    hideDismiss: true
                } )
                invalidate('student:reload');
                modalStore.close();
            }
        }
    }

    if (type === EDIT_STUDENT_MODAL) {
        modalTitle = "Chỉnh sửa thông tin";
        studentData = [$modalStore[0].meta.data.student_id,
                       $modalStore[0].meta.data.full_name,
                       $modalStore[0].meta.data.date_of_birth,
                       $modalStore[0].meta.data.gender,
                       $modalStore[0].meta.data.address,
                       $modalStore[0].meta.data.phone_number,
                       $modalStore[0].meta.data.school_year,          
                       $modalStore[0].meta.data.class_name,
                       '',
                       '',
                       $modalStore[0].meta.data.id]
        labels = ['MSV', 'Họ tên', 'Ngày sinh', 'Giới tính', 'Địa chỉ', 'Số điện thoại', 'Khoá', 'Lớp'];
        inputNames = ['student_id', 'full_name', 'date_of_birth', 'gender', 'address', 'phone_number', 'school_year', 'class_name'];
    }
    else if (type === ADD_STUDENT_MODAL) {
        modalTitle = "Thêm thông tin";
        labels = ['MSV', 'Họ tên', 'Ngày sinh', 'Giới tính', 'Địa chỉ', 'Số điện thoại', 'Khoá', 'Lớp', 'Email', 'Mật khẩu'];
        inputNames = ['student_id', 'full_name', 'date_of_birth', 'gender', 'address', 'phone_number', 'school_year', 'class_name', 'email', 'password'];
    }
    else {
        modalTitle = "Xoá thông tin";
        studentID = $modalStore[0].meta.data.id;
        labels = ['Bạn có chắc chắn xoá toàn bộ thông tin cũng như tài khoản của sinh viên này?'];
    }

    const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';

</script>				

{#if $modalStore[0]}
	<div class="{cBase}">
		<header class={cHeader}>{modalTitle}</header>
		<article></article>

        {#if type === DELETE_STUDENT_MODAL}
        <form class="{cForm}" method="POST" action="/" use:enhance={formEnhance}>
            <label for="id" class="label">{labels[0]}</label>
            <input type="text" name="id" value={studentID} hidden />
            <div class="{parent.regionFooter}">
                <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>Huỷ</button>
                <button class="btn {parent.buttonPositive}" formaction="?/delete">Xoá</button>
            </div>
        </form>

        {:else}
		<form class="{cForm}" method="POST" action="/" use:enhance={formEnhance}>
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

            <!-- Sorry for this workaround. No other solutions could be found. -->
            <input name="id" class="input" type="text"
                value={studentData[ID_INDEX]} hidden/> 

            <div class="{parent.regionFooter}">
                <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>Huỷ</button>
                <button class="btn {parent.buttonPositive}" formaction="?/update">Lưu</button>
            </div>
		</form>
        {/if}
		<!-- prettier-ignore -->
	</div>
{/if}
						