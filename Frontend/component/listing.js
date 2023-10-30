const listing = {
        template: `
            <a :href="'recipeDetail.html?id=' + r.recipeId" class="col-md-6 col-lg-4 container-listing" v-for="r in recipeData" >
                <!-- <div class="recipe-img" :style="{ backgroundImage: 'url(' + (r.image ? r.image : r.image2) + ')' }"> -->
                <div class="recipe-img">
                    <img :src="(r.image ? r.image : r.image2)" class="img-fluid" />
                    <div v-if="select">
                        <!-- not selected -->
                        <svg v-if="this.selectedListings.indexOf(r.recipeId) <= -1" @click.prevent="toggleSelect(r.recipeId)" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
                            <g clip-path="url(#clip0_285_1392)">
                            <path d="M19.4997 4.5H6.49967C5.30801 4.5 4.33301 5.5125 4.33301 6.75V20.25C4.33301 21.4875 5.30801 22.5 6.49967 22.5H19.4997C20.6913 22.5 21.6663 21.4875 21.6663 20.25V6.75C21.6663 5.5125 20.6913 4.5 19.4997 4.5ZM19.4997 20.25H6.49967V6.75H19.4997V20.25Z" fill="#DE352A"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_285_1392">
                            <rect width="32" height="32" fill="white"/>
                            </clipPath>
                            </defs>
                        </svg>

                        <!-- selected -->
                        <svg v-else @click.prevent="toggleSelect(r.recipeId)" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
                            <g clip-path="url(#clip0_278_1385)">
                            <path d="M19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.11 21 21 20.1 21 19V5C21 3.9 20.11 3 19 3ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="#DE352A"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_278_1385">
                            <rect width="32" height="32" fill="white"/>
                            </clipPath>
                            </defs>
                        </svg>

                    </div>

                    <div v-else-if="all">
                        <!-- no all -->
                        <svg v-if="this.allSelected.indexOf(r.recipeId) <= -1" @click.prevent="toggleAll(r.recipeId)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <g clip-path="url(#clip0_278_1379)">
                            <path d="M12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="#DE352A"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_278_1379">
                            <rect width="24" height="24" fill="white"/>
                            </clipPath>
                            </defs>
                        </svg>

                        <!-- all -->
                        <svg v-else @click.prevent="toggleAll(r.recipeId)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <g clip-path="url(#clip0_278_1382)">
                            <path d="M12 7C9.24 7 7 9.24 7 12C7 14.76 9.24 17 12 17C14.76 17 17 14.76 17 12C17 9.24 14.76 7 12 7ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" fill="#DE352A"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_278_1382">
                            <rect width="24" height="24" fill="white"/>
                            </clipPath>
                            </defs>
                        </svg>
                    </div>

                    <div v-else>
                        <!-- favourited -->
                        <svg v-if="r.fav == 1" @click.prevent="changeColor(r)" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <g clip-path="url(#clip0_278_1363)">
                            <path d="M16.0003 28.4667L14.067 26.7067C7.20033 20.48 2.66699 16.3733 2.66699 11.3333C2.66699 7.22667 5.89366 4 10.0003 4C12.3203 4 14.547 5.08 16.0003 6.78667C17.4537 5.08 19.6803 4 22.0003 4C26.107 4 29.3337 7.22667 29.3337 11.3333C29.3337 16.3733 24.8003 20.48 17.9337 26.72L16.0003 28.4667Z" fill="#DE352A"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_278_1363">
                            <rect width="32" height="32" fill="white"/>
                            </clipPath>
                            </defs>
                        </svg>

                        <!-- not favourited -->
                        <svg v-else @click.prevent="changeColor(r)" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <g clip-path="url(#clip0_278_1357)">
                                <path d="M22.0003 4C19.6803 4 17.4537 5.08 16.0003 6.78667C14.547 5.08 12.3203 4 10.0003 4C5.89366 4 2.66699 7.22667 2.66699 11.3333C2.66699 16.3733 7.20033 20.48 14.067 26.72L16.0003 28.4667L17.9337 26.7067C24.8003 20.48 29.3337 16.3733 29.3337 11.3333C29.3337 7.22667 26.107 4 22.0003 4ZM16.1337 24.7333L16.0003 24.8667L15.867 24.7333C9.52033 18.9867 5.33366 15.1867 5.33366 11.3333C5.33366 8.66667 7.33366 6.66667 10.0003 6.66667C12.0537 6.66667 14.0537 7.98667 14.7603 9.81333H17.2537C17.947 7.98667 19.947 6.66667 22.0003 6.66667C24.667 6.66667 26.667 8.66667 26.667 11.3333C26.667 15.1867 22.4803 18.9867 16.1337 24.7333Z" fill="#DE352A"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_278_1357">
                                <rect width="32" height="32" fill="white"/>
                            </clipPath>
                            </defs>
                        </svg>
                    </div>
                </div>
                <div class="listing-subdesc">
                    <div class="subdesc">
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 25 25" fill="none">
                        <path d="M9.79358 2.4348H14.309C14.5086 2.4348 14.7 2.35665 14.8411 2.21753C14.9823 2.07841 15.0616 1.88973 15.0616 1.69299C15.0616 1.49625 14.9823 1.30756 14.8411 1.16844C14.7 1.02933 14.5086 0.951172 14.309 0.951172H9.79358C9.59399 0.951172 9.40257 1.02933 9.26144 1.16844C9.1203 1.30756 9.04102 1.49625 9.04102 1.69299C9.04102 1.88973 9.1203 2.07841 9.26144 2.21753C9.40257 2.35665 9.59399 2.4348 9.79358 2.4348Z" fill="black"/>
                        <path d="M12.0513 3.91821C10.2652 3.91821 8.51919 4.44029 7.03408 5.41843C5.54897 6.39657 4.39146 7.78684 3.70794 9.41343C3.02442 11.04 2.84558 12.8299 3.19404 14.5566C3.54249 16.2834 4.4026 17.8696 5.66558 19.1145C6.92856 20.3594 8.5377 21.2072 10.2895 21.5507C12.0413 21.8942 13.8571 21.7179 15.5073 21.0442C17.1574 20.3704 18.5679 19.2294 19.5602 17.7656C20.5525 16.3017 21.0822 14.5806 21.0822 12.82C21.0794 10.4599 20.1271 8.19726 18.4341 6.52843C16.7411 4.8596 14.4456 3.92088 12.0513 3.91821ZM16.3085 9.67271L12.5835 13.3445C12.5136 13.4134 12.4307 13.4681 12.3394 13.5053C12.2481 13.5426 12.1502 13.5618 12.0514 13.5618C11.9525 13.5618 11.8547 13.5426 11.7634 13.5054C11.6721 13.4681 11.5891 13.4134 11.5192 13.3446C11.4493 13.2757 11.3939 13.1939 11.356 13.1039C11.3182 13.0139 11.2988 12.9174 11.2987 12.82C11.2987 12.7226 11.3182 12.6261 11.356 12.5361C11.3938 12.4461 11.4493 12.3643 11.5192 12.2955L15.2442 8.62365C15.3141 8.55476 15.397 8.50012 15.4883 8.46284C15.5796 8.42555 15.6775 8.40636 15.7763 8.40636C15.8752 8.40636 15.973 8.42555 16.0643 8.46282C16.1556 8.5001 16.2386 8.55474 16.3085 8.62362C16.3784 8.69251 16.4338 8.77428 16.4716 8.86428C16.5095 8.95428 16.5289 9.05074 16.5289 9.14816C16.5289 9.24558 16.5095 9.34204 16.4716 9.43204C16.4338 9.52205 16.3784 9.60382 16.3085 9.67271H16.3085Z" fill="black"/>
                        </svg>
                        <span class="p-14">{{(r.readyInMinutes===-1 ? "Unknown" : r.readyInMinutes)}} Minutes</span>
                    </div>
                    <div class="subdesc">
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 25 25" fill="none">
                        <path d="M12.4989 8.34838C12.4985 8.33497 12.498 8.32157 12.4968 8.30808C12.4957 8.29454 12.494 8.28119 12.4921 8.26787C12.4911 8.26099 12.4908 8.25415 12.4897 8.24723L11.7371 3.79634C11.7209 3.7002 11.6857 3.60814 11.6334 3.52544C11.5811 3.44273 11.5128 3.371 11.4323 3.31433C11.3519 3.25766 11.2609 3.21717 11.1646 3.19517C11.0683 3.17317 10.9685 3.1701 10.871 3.18612C10.7734 3.20215 10.6801 3.23696 10.5962 3.28856C10.5123 3.34017 10.4396 3.40756 10.3822 3.48688C10.3247 3.56621 10.2837 3.65591 10.2615 3.75087C10.2392 3.84582 10.2361 3.94417 10.2525 4.04029L10.859 7.62739H9.11337V3.91831C9.11337 3.72157 9.03409 3.53289 8.89295 3.39377C8.75182 3.25465 8.5604 3.1765 8.36081 3.1765C8.16121 3.1765 7.96979 3.25465 7.82866 3.39377C7.68753 3.53289 7.60824 3.72157 7.60824 3.91831V7.62739H5.86264L6.46914 4.04029C6.48546 3.94417 6.48241 3.84582 6.46015 3.75087C6.4379 3.65591 6.39688 3.56621 6.33944 3.48688C6.282 3.40756 6.20927 3.34017 6.1254 3.28856C6.04153 3.23696 5.94816 3.20215 5.85064 3.18612C5.75312 3.1701 5.65335 3.17317 5.55703 3.19517C5.46071 3.21717 5.36973 3.25766 5.2893 3.31433C5.20886 3.371 5.14054 3.44273 5.08824 3.52544C5.03594 3.60814 5.00069 3.7002 4.98449 3.79634L4.23192 8.24723C4.23077 8.25415 4.2305 8.26099 4.22949 8.26787C4.22765 8.28118 4.22595 8.29454 4.2248 8.30808C4.22366 8.32157 4.22315 8.33497 4.22273 8.34838C4.22255 8.35535 4.22168 8.36219 4.22168 8.3692C4.22168 8.37581 4.22214 8.38229 4.22218 8.38885C4.22232 8.39342 4.22232 8.39795 4.22255 8.40248C4.23164 9.34959 4.57428 10.2642 5.19186 10.9898C5.80945 11.7154 6.6636 12.2069 7.60824 12.3804V21.7219C7.60824 21.9186 7.68753 22.1073 7.82866 22.2464C7.96979 22.3855 8.16121 22.4637 8.36081 22.4637C8.5604 22.4637 8.75182 22.3855 8.89295 22.2464C9.03409 22.1073 9.11337 21.9186 9.11337 21.7219V12.3804C10.058 12.2069 10.9122 11.7154 11.5298 10.9898C12.1473 10.2642 12.49 9.34959 12.4991 8.40248C12.4993 8.39795 12.4993 8.39343 12.4994 8.38885C12.4995 8.38229 12.4999 8.37581 12.4999 8.3692C12.4999 8.36219 12.4991 8.35535 12.4989 8.34838Z" fill="black"/>
                        <path d="M20.4013 3.9052C20.4011 3.8899 20.4002 3.87459 20.399 3.85924C20.3981 3.84883 20.3972 3.83851 20.3959 3.82823C20.3943 3.81541 20.3922 3.8026 20.3899 3.78979C20.3877 3.77688 20.3851 3.76412 20.3822 3.75148C20.3798 3.74143 20.3771 3.73143 20.3743 3.72142C20.3702 3.70652 20.3657 3.69185 20.3606 3.67737C20.3591 3.6732 20.3582 3.66899 20.3567 3.66482C20.355 3.66034 20.3528 3.65618 20.3511 3.65174C20.3454 3.6372 20.3393 3.62293 20.3327 3.60891C20.3285 3.59976 20.3241 3.59073 20.3195 3.58183C20.3133 3.56988 20.3068 3.55812 20.2999 3.54656C20.2939 3.53619 20.2877 3.526 20.2811 3.516C20.2749 3.50658 20.2685 3.49744 20.2618 3.48829C20.2539 3.47724 20.2458 3.46642 20.2373 3.45592C20.231 3.44817 20.2245 3.4407 20.218 3.43323C20.2086 3.42255 20.199 3.412 20.189 3.4019C20.1821 3.39484 20.1748 3.38805 20.1675 3.38126C20.1575 3.37184 20.1474 3.3626 20.1369 3.35377C20.1285 3.34666 20.1197 3.33996 20.1109 3.33322C20.1011 3.3257 20.0912 3.31823 20.081 3.31117C20.0706 3.30397 20.0598 3.29722 20.049 3.29057C20.0399 3.28491 20.0308 3.2792 20.0213 3.27395C20.0091 3.26707 19.9965 3.26073 19.9839 3.25453C19.9752 3.25027 19.9665 3.24601 19.9577 3.24207C19.9444 3.23619 19.9308 3.23085 19.9171 3.22568C19.908 3.22229 19.8989 3.21889 19.8896 3.21581C19.8765 3.21142 19.8631 3.20757 19.8497 3.20391C19.8389 3.20096 19.8282 3.1982 19.8174 3.19571C19.8055 3.19304 19.7934 3.19073 19.7812 3.1886C19.768 3.18625 19.7548 3.18426 19.7415 3.18263C19.7312 3.1814 19.7209 3.18041 19.7106 3.17955C19.6952 3.17832 19.6797 3.17756 19.6641 3.17724C19.6592 3.17715 19.6544 3.17651 19.6494 3.17651C19.6449 3.17651 19.6404 3.1771 19.6359 3.17719C19.6205 3.17746 19.605 3.17828 19.5896 3.1795C19.579 3.18032 19.5684 3.18126 19.558 3.18254C19.545 3.18412 19.532 3.18611 19.519 3.18838C19.5059 3.19064 19.493 3.19313 19.4802 3.19607C19.47 3.19838 19.4598 3.20101 19.4497 3.20377C19.4345 3.20784 19.4197 3.21233 19.405 3.21735C19.4007 3.21876 19.3965 3.21966 19.3922 3.22115C19.383 3.2245 19.3738 3.22849 19.3646 3.23188C19.3611 3.23329 19.3575 3.23451 19.354 3.23596C17.4152 3.95419 15.8626 6.29866 14.7392 10.207C14.2296 12.0105 13.8598 13.8496 13.6332 15.7083C13.6219 15.8118 13.6329 15.9165 13.6654 16.0155C13.6979 16.1145 13.7511 16.2057 13.8217 16.2831C13.8923 16.3606 13.9786 16.4225 14.075 16.4649C14.1714 16.5073 14.2758 16.5292 14.3814 16.5292H18.8968V21.7219C18.8968 21.9186 18.9761 22.1073 19.1173 22.2464C19.2584 22.3855 19.4498 22.4637 19.6494 22.4637C19.849 22.4637 20.0404 22.3855 20.1816 22.2464C20.3227 22.1073 20.402 21.9186 20.402 21.7219V3.91833C20.402 3.91389 20.4014 3.90964 20.4013 3.9052Z" fill="black"/>
                        </svg>
                        <!-- <span class="p-14">{{ r.dishtypes && r.dishtypes.length > 0 ? r.dishtypes[0] : 'Snack' }}</span> -->
                        <span class="p-14">{{ r.servings }} People</span>
                    </div>
                    </div>
                    <h6>{{r.title}} {{ r.ind }}</h6>
                
            </a>
        `,
        templatetwo:`
            <a href="./recipedetail.html" class="col top-recipe" v-for="r in recipeData">
                <div class="img" :style="{ backgroundImage: \`url(\${r.image})\` }"></div>
                <h5>{{r.title}}</h5>
                <p>{{r.summary}}...</p>
            </a>
        `,
        single: `
            <div class="container-listing" >
                <div class="recipe-img" :style="{ backgroundImage: 'url(' + random.image + ')' }">

                </div>
                <div class="listing-subdesc">
                    <div class="subdesc">
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 25 25" fill="none">
                        <path d="M9.79358 2.4348H14.309C14.5086 2.4348 14.7 2.35665 14.8411 2.21753C14.9823 2.07841 15.0616 1.88973 15.0616 1.69299C15.0616 1.49625 14.9823 1.30756 14.8411 1.16844C14.7 1.02933 14.5086 0.951172 14.309 0.951172H9.79358C9.59399 0.951172 9.40257 1.02933 9.26144 1.16844C9.1203 1.30756 9.04102 1.49625 9.04102 1.69299C9.04102 1.88973 9.1203 2.07841 9.26144 2.21753C9.40257 2.35665 9.59399 2.4348 9.79358 2.4348Z" fill="black"/>
                        <path d="M12.0513 3.91821C10.2652 3.91821 8.51919 4.44029 7.03408 5.41843C5.54897 6.39657 4.39146 7.78684 3.70794 9.41343C3.02442 11.04 2.84558 12.8299 3.19404 14.5566C3.54249 16.2834 4.4026 17.8696 5.66558 19.1145C6.92856 20.3594 8.5377 21.2072 10.2895 21.5507C12.0413 21.8942 13.8571 21.7179 15.5073 21.0442C17.1574 20.3704 18.5679 19.2294 19.5602 17.7656C20.5525 16.3017 21.0822 14.5806 21.0822 12.82C21.0794 10.4599 20.1271 8.19726 18.4341 6.52843C16.7411 4.8596 14.4456 3.92088 12.0513 3.91821ZM16.3085 9.67271L12.5835 13.3445C12.5136 13.4134 12.4307 13.4681 12.3394 13.5053C12.2481 13.5426 12.1502 13.5618 12.0514 13.5618C11.9525 13.5618 11.8547 13.5426 11.7634 13.5054C11.6721 13.4681 11.5891 13.4134 11.5192 13.3446C11.4493 13.2757 11.3939 13.1939 11.356 13.1039C11.3182 13.0139 11.2988 12.9174 11.2987 12.82C11.2987 12.7226 11.3182 12.6261 11.356 12.5361C11.3938 12.4461 11.4493 12.3643 11.5192 12.2955L15.2442 8.62365C15.3141 8.55476 15.397 8.50012 15.4883 8.46284C15.5796 8.42555 15.6775 8.40636 15.7763 8.40636C15.8752 8.40636 15.973 8.42555 16.0643 8.46282C16.1556 8.5001 16.2386 8.55474 16.3085 8.62362C16.3784 8.69251 16.4338 8.77428 16.4716 8.86428C16.5095 8.95428 16.5289 9.05074 16.5289 9.14816C16.5289 9.24558 16.5095 9.34204 16.4716 9.43204C16.4338 9.52205 16.3784 9.60382 16.3085 9.67271H16.3085Z" fill="black"/>
                        </svg>
                        <span class="p-14">{{random.readyInMinutes}} Minutes</span>
                    </div>
                    <div class="subdesc">
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 25 25" fill="none">
                        <path d="M12.4989 8.34838C12.4985 8.33497 12.498 8.32157 12.4968 8.30808C12.4957 8.29454 12.494 8.28119 12.4921 8.26787C12.4911 8.26099 12.4908 8.25415 12.4897 8.24723L11.7371 3.79634C11.7209 3.7002 11.6857 3.60814 11.6334 3.52544C11.5811 3.44273 11.5128 3.371 11.4323 3.31433C11.3519 3.25766 11.2609 3.21717 11.1646 3.19517C11.0683 3.17317 10.9685 3.1701 10.871 3.18612C10.7734 3.20215 10.6801 3.23696 10.5962 3.28856C10.5123 3.34017 10.4396 3.40756 10.3822 3.48688C10.3247 3.56621 10.2837 3.65591 10.2615 3.75087C10.2392 3.84582 10.2361 3.94417 10.2525 4.04029L10.859 7.62739H9.11337V3.91831C9.11337 3.72157 9.03409 3.53289 8.89295 3.39377C8.75182 3.25465 8.5604 3.1765 8.36081 3.1765C8.16121 3.1765 7.96979 3.25465 7.82866 3.39377C7.68753 3.53289 7.60824 3.72157 7.60824 3.91831V7.62739H5.86264L6.46914 4.04029C6.48546 3.94417 6.48241 3.84582 6.46015 3.75087C6.4379 3.65591 6.39688 3.56621 6.33944 3.48688C6.282 3.40756 6.20927 3.34017 6.1254 3.28856C6.04153 3.23696 5.94816 3.20215 5.85064 3.18612C5.75312 3.1701 5.65335 3.17317 5.55703 3.19517C5.46071 3.21717 5.36973 3.25766 5.2893 3.31433C5.20886 3.371 5.14054 3.44273 5.08824 3.52544C5.03594 3.60814 5.00069 3.7002 4.98449 3.79634L4.23192 8.24723C4.23077 8.25415 4.2305 8.26099 4.22949 8.26787C4.22765 8.28118 4.22595 8.29454 4.2248 8.30808C4.22366 8.32157 4.22315 8.33497 4.22273 8.34838C4.22255 8.35535 4.22168 8.36219 4.22168 8.3692C4.22168 8.37581 4.22214 8.38229 4.22218 8.38885C4.22232 8.39342 4.22232 8.39795 4.22255 8.40248C4.23164 9.34959 4.57428 10.2642 5.19186 10.9898C5.80945 11.7154 6.6636 12.2069 7.60824 12.3804V21.7219C7.60824 21.9186 7.68753 22.1073 7.82866 22.2464C7.96979 22.3855 8.16121 22.4637 8.36081 22.4637C8.5604 22.4637 8.75182 22.3855 8.89295 22.2464C9.03409 22.1073 9.11337 21.9186 9.11337 21.7219V12.3804C10.058 12.2069 10.9122 11.7154 11.5298 10.9898C12.1473 10.2642 12.49 9.34959 12.4991 8.40248C12.4993 8.39795 12.4993 8.39343 12.4994 8.38885C12.4995 8.38229 12.4999 8.37581 12.4999 8.3692C12.4999 8.36219 12.4991 8.35535 12.4989 8.34838Z" fill="black"/>
                        <path d="M20.4013 3.9052C20.4011 3.8899 20.4002 3.87459 20.399 3.85924C20.3981 3.84883 20.3972 3.83851 20.3959 3.82823C20.3943 3.81541 20.3922 3.8026 20.3899 3.78979C20.3877 3.77688 20.3851 3.76412 20.3822 3.75148C20.3798 3.74143 20.3771 3.73143 20.3743 3.72142C20.3702 3.70652 20.3657 3.69185 20.3606 3.67737C20.3591 3.6732 20.3582 3.66899 20.3567 3.66482C20.355 3.66034 20.3528 3.65618 20.3511 3.65174C20.3454 3.6372 20.3393 3.62293 20.3327 3.60891C20.3285 3.59976 20.3241 3.59073 20.3195 3.58183C20.3133 3.56988 20.3068 3.55812 20.2999 3.54656C20.2939 3.53619 20.2877 3.526 20.2811 3.516C20.2749 3.50658 20.2685 3.49744 20.2618 3.48829C20.2539 3.47724 20.2458 3.46642 20.2373 3.45592C20.231 3.44817 20.2245 3.4407 20.218 3.43323C20.2086 3.42255 20.199 3.412 20.189 3.4019C20.1821 3.39484 20.1748 3.38805 20.1675 3.38126C20.1575 3.37184 20.1474 3.3626 20.1369 3.35377C20.1285 3.34666 20.1197 3.33996 20.1109 3.33322C20.1011 3.3257 20.0912 3.31823 20.081 3.31117C20.0706 3.30397 20.0598 3.29722 20.049 3.29057C20.0399 3.28491 20.0308 3.2792 20.0213 3.27395C20.0091 3.26707 19.9965 3.26073 19.9839 3.25453C19.9752 3.25027 19.9665 3.24601 19.9577 3.24207C19.9444 3.23619 19.9308 3.23085 19.9171 3.22568C19.908 3.22229 19.8989 3.21889 19.8896 3.21581C19.8765 3.21142 19.8631 3.20757 19.8497 3.20391C19.8389 3.20096 19.8282 3.1982 19.8174 3.19571C19.8055 3.19304 19.7934 3.19073 19.7812 3.1886C19.768 3.18625 19.7548 3.18426 19.7415 3.18263C19.7312 3.1814 19.7209 3.18041 19.7106 3.17955C19.6952 3.17832 19.6797 3.17756 19.6641 3.17724C19.6592 3.17715 19.6544 3.17651 19.6494 3.17651C19.6449 3.17651 19.6404 3.1771 19.6359 3.17719C19.6205 3.17746 19.605 3.17828 19.5896 3.1795C19.579 3.18032 19.5684 3.18126 19.558 3.18254C19.545 3.18412 19.532 3.18611 19.519 3.18838C19.5059 3.19064 19.493 3.19313 19.4802 3.19607C19.47 3.19838 19.4598 3.20101 19.4497 3.20377C19.4345 3.20784 19.4197 3.21233 19.405 3.21735C19.4007 3.21876 19.3965 3.21966 19.3922 3.22115C19.383 3.2245 19.3738 3.22849 19.3646 3.23188C19.3611 3.23329 19.3575 3.23451 19.354 3.23596C17.4152 3.95419 15.8626 6.29866 14.7392 10.207C14.2296 12.0105 13.8598 13.8496 13.6332 15.7083C13.6219 15.8118 13.6329 15.9165 13.6654 16.0155C13.6979 16.1145 13.7511 16.2057 13.8217 16.2831C13.8923 16.3606 13.9786 16.4225 14.075 16.4649C14.1714 16.5073 14.2758 16.5292 14.3814 16.5292H18.8968V21.7219C18.8968 21.9186 18.9761 22.1073 19.1173 22.2464C19.2584 22.3855 19.4498 22.4637 19.6494 22.4637C19.849 22.4637 20.0404 22.3855 20.1816 22.2464C20.3227 22.1073 20.402 21.9186 20.402 21.7219V3.91833C20.402 3.91389 20.4014 3.90964 20.4013 3.9052Z" fill="black"/>
                        </svg>
                        <!-- <span class="p-14">{{ random.dishtypes && random.dishtypes.length > 0 ? random.dishtypes[0] : 'Snack' }}</span> -->
                        <span class="p-14">{{ random.servings }} People</span>
                    </div>
                </div>
                <h6>{{random.title}} {{ random.ind }}</h6>
            </div>
        `,
        methods: {
            changeColor(recipe) {
                    console.log(recipe)
                    recipe.fav = recipe.fav === 0 ? 1 : 0;
                    if (recipe.fav === 1){
                        axios.post(`https://leaptron2.dscloud.me:3000/api/user/${userId}/recipe/${recipe.recipeId}`, null, {headers})
                        .then(response => {
                            console.log("success")
                        }).catch( error => {
    
                        });
                    } else {
                        axios.delete(`https://leaptron2.dscloud.me:3000/api/user/${userId}/recipe/`, 
                        {
                            headers, 
                            data: {
                                recipeIds: recipe.recipeId.toString()
                            }
                        })
                        .then(response => {
                            console.log("success")
                        }).catch( error => {
    
                        });
                    }
                }
            }
};
   
