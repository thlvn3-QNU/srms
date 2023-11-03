 <script>
    import Topbar from "../Topbar/+page.svelte"
    import Sidebar from "../Sidebar/+page.svelte" 
 </script>

<main>
      
<div class="">
        <Topbar/>
        <div class="flex ">
            <div class="">
                <Sidebar/>
            </div>

              <div class="flex-1">
                <div class=" bg-gray-100 m-[20px] py-[10px] pl-[10px] text-[18px] font-medium">
                    Thông tin ADMIN
                </div>
                <div class="bg-gray-100 m-[20px] ">
                    <table class="grid grid-flow-col grid-col-3">
                        <thead class=" ">
                            <tr class="flex flex-col text-left w-full ">
                                <th class=" pl-[20px]">Họ tên </th>
                                <th class=" pl-[20px]">Ngày sinh</th>
                                <th class=" pl-[20px]">Nơi sinh</th>
                                <th class=" pl-[20px]">Giới tính</th>
                                <th class=" pl-[20px]">Số điện thoại</th>
                                <th class=" pl-[20px]">Email</th>
                                <th class=" pl-[20px]">Ngày tạo tài khoản</th>
                            </tr>
                        </thead>
                        <tbody class="col-span-2">
                            <tr class="flex flex-col">
                                <td>Nguyễn Văn A</td>
                                <td>1-01-1995</td>
                                <td>An Nhơn - Bình Định</td>
                                <td>Nam</td>
                                <td>039543534</td>
                                <td>Admin@gmail.com</td>
                                <td>1-01/2017</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="text-right mr-[20px] my-[30px]">
                    <button
                        class="px-[10px] py-[5px] bg-blue-400 hover:bg-blue-300  text-[16px] font-medium rounded-[5px] "
                        >
                        Sửa thông tin
                   </button>
                </div>
            </div>
        </div>
    </div>


</main>