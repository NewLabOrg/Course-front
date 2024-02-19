<template>
    <div class="mt-12">
        <div class="container flex justify-between mx-auto">
            <div class="container mx-auto">
                <div class="ml-16">
                    <p class="mx-auto font-extrabold text-5xl  text-[#333333]">Идея сайта</p>
                </div>
                <div class="md:w-2/3   ">
                    <p class="p-2 font-normal text-sm font-montserrat md:p-14">Добро пожаловать на наш сайт, посвящённый размещению научных статей! Мы создали эту платформу с целью предоставить исследователям, ученым и студентам возможность делиться своими открытиями, результатами и идеями в области науки. Здесь вы можете опубликовать свои статьи, получить обратную связь от сообщества, а также находить интересные работы других авторов для обсуждения и вдохновения. Мы стремимся создать вдохновляющее и поддерживающее окружение для обмена знаниями и научных исследований. Присоединяйтесь к нашему сообществу и вместе мы будем способствовать прогрессу и развитию научного знания!</p>
                </div>
            </div>
            <div>
                <img class="hidden md:block w-96 h-96"
                src="../../assets/shlogo.svg" alt=""
                @mousemove="handleMouseMove"
                :style="imageStyle"
                >
            </div>
        </div>

        <div class="mt-12 font-montserrat">
            <p class="text-center font-extrabold text-5xl text-[#333333]">Технологии</p>
            <div class="container mx-auto md:flex justify-between mt-12">
                <div class="text-center">
                    <img class="container mx-auto w-56" src="../../assets/firstBodyPhoto/cloud.svg" alt="">
                    <p class="font-medium text-base">Облачное хранение</p>
                    <p class="font-normal text-xs text-center w-48 container mx-auto">Доступ из любой точки мира с любого устройства</p>
                </div>
                <div class="text-center">
                    <img class="container mx-auto w-56 " src="../../assets/firstBodyPhoto/pdf.svg" alt="">
                    <p class="font-medium text-base">Безопастность</p>
                    <p class="font-normal text-xs text-center w-48 container mx-auto">Вся  информация хранится на защищенных облачных серверах</p>
                </div>
                <div class="text-center">
                    <img class="container mx-auto w-56" src="../../assets/firstBodyPhoto/search.svg" alt="">
                    <p class="font-medium">PDF Отчеты</p>
                    <p class="font-normal text-xs text-center w-48 container mx-auto">Скачивайте ваши отчеты в удобном формате PDF</p>
                </div>
                <div class="text-center">
                    <img class="container mx-auto w-48" src="../../assets/firstBodyPhoto/svc.svg" alt="">
                    <p class="font-medium">CSV Отчеты</p>
                    <p class="font-normal text-xs text-center w-48 container mx-auto">Скачивайте ваши отчеты в удобном формате CSV</p>
                </div>
            </div>
        </div>
        <div class="bg-black font-montserrat p-12  mt-4">
            <div class="text-white container mx-auto">
                <p class="text-7xl font-medium">Онлайн ресурс <br/> для размещения <br/>  научных проектов <br/> <span class="text-[#F90B28]">реализация ваших мыслей</span></p>
            </div>
        </div>
        <div class="mt-12 container mx-auto font-montserrat">

            <div class="diag">
                <p class="font-medium text-7xl"><span class="text-red-600">Рост вашего проекта</span> <br/> происходит за счет нас</p>

                <div class="flex justify-between mt-48 pb-20">
                    <div class="w-80 font-normal text-xl">
                        Мы можем помочь вам кратно вырасти при соблюдении 2х условий:
                    </div>
                    <div class="flex ">
                        <div class="mx-4">
                            <p class="font-medium text-2xl"> Публикация статей</p>
                            <p class="font-normal text-sm w-80"> это отличный способ поделиться своими идеями, исследованиями и знаниями с сообществом. Когда вы публикуете свои работы, вы даете возможность другим людям узнать о вашем творчестве, а также получить ценные замечания и отзывы.</p>
                            <p class="font-normal text-sm w-80 pt-4">Публикуйте свои статьи и получайте обратную связь от сообщества</p>
                        </div>
                        <div class="mx-4">
                            <p class="font-medium text-2xl"> Обсуждение</p>
                            <p class="font-normal text-sm w-80 ">Обсуждение работ других авторов является важной частью творческого процесса. Это позволяет вам получить новые идеи, вдохновение, а также узнать о различных подходах к творчеству. Обсуждение работ коллег по цеху или авторов из других областей может расширить ваше видение и помочь вам увидеть ваше собственное творчество с новой перспективы.</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: 'FirstBody',
        data() {
            return {
                imageStyle: {
                    position: 'relative',
                    transition: 'transform 0.3s',
                    transform: 'translate(0, 0)'
                }
            }
        },
        methods: {
            handleMouseMove(event) {
                const image = event.target;
                const imageRect = image.getBoundingClientRect();
                const imageCenterX = imageRect.left + imageRect.width / 2;
                const imageCenterY = imageRect.top + imageRect.height / 2;
                const mouseX = event.clientX;
                const mouseY = event.clientY;
                const offsetX = mouseX - imageCenterX;
                const offsetY = mouseY - imageCenterY;
                const maxOffset = 50;
                const offsetXClamped = Math.max(-maxOffset, Math.min(maxOffset, offsetX));
                const offsetYClamped = Math.max(-maxOffset, Math.min(maxOffset, offsetY));
                const translateX = offsetXClamped / maxOffset * 10;
                const translateY = offsetYClamped / maxOffset * 10;
                this.imageStyle.transform = `translate(${translateX}px, ${translateY}px) rotate(${offsetXClamped / maxOffset * 10}deg)`;
            }
        }
    }
</script>
                                             