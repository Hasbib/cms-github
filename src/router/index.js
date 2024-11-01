import { createRouter, createWebHistory } from 'vue-router';

//Teacher
import DashboardTC from '@/pages/role/teacher/Dashboard.vue';

//Superadmin
import DashboardSA from '@/pages/role/superadmin/Dashboard.vue';
import CourseManajemen from '@/pages/role/superadmin/CourseManajemen.vue';
import FaqAdmin from '@/pages/role/superadmin/Faq.vue';
import HelpCenter from '@/pages/role/superadmin/HelpCenter.vue';
import Sponsor from '@/pages/role/superadmin/cms/Sponsor.vue';
import MediaPartner from '@/pages/role/superadmin/cms/MediaPartner.vue';
import SosialMedia from '@/pages/role/superadmin/cms/SosialMedia.vue';
import AboutUs from '@/pages/role/superadmin/cms/AboutUs.vue';
import MasterDataCategory from '@/pages/role/superadmin/masterdata/MasterDataCategory.vue';
import MasterDataSkill from '@/pages/role/superadmin/masterdata/MasterDataSkill.vue';
import MasterDataLevelCourse from '@/pages/role/superadmin/masterdata/MasterDataLevelCourse.vue';
import MasterDataLevelTeacher from '@/pages/role/superadmin/masterdata/MasterDataLevelTeacher.vue';
import MasterDataTools from '@/pages/role/superadmin/masterdata/MasterDataTools.vue';

//Auth Teacher
import Login from '@/pages/auth/Login.vue';
import RegistrasiTeacher from '@/pages/auth/Registrasi-teacher.vue';
import Verificationemail from '@/pages/auth/Verificationemail.vue';

import Error from '@/pages/404/404.vue';

//TEST
import Test from '@/pages/Test.vue';

//Sementara Auth Teacher
import MasterData1 from '@/pages/role/superadmin/MasterData1.vue';
import MasterData2 from '@/pages/role/superadmin/MasterData2.vue';
import MasterData3 from '@/pages/role/superadmin/MasterData3.vue';

const routes = [

    //Auth Superadmin
  { path: '/', component: Login },
  { path: '/registrasi-teacher', component: RegistrasiTeacher },
  { path: '/verification-email', component: Verificationemail },
  
  //Teacher
  { path: '/dashboard-teacher', component: DashboardTC, meta: { requiresAuth: true, role: 'teacher' } },

  //Superadmin
  { path: '/dashboard-superadmin', component: DashboardSA },
  { path: '/course-manajemen', component: CourseManajemen },
  { path: '/faq-admin', component: FaqAdmin },
  { path: '/help-center', component: HelpCenter },
  { path: '/cms/media-partner', component: MediaPartner },
  { path: '/cms/sosial-media', component: SosialMedia },
  { path: '/cms/sponsor', component: Sponsor },
  { path: '/cms/about-us', component: AboutUs },
  { path: '/master-data/category', component: MasterDataCategory },
  { path: '/master-data/skills', component: MasterDataSkill },
  { path: '/master-data/level-course', component: MasterDataLevelCourse },
  { path: '/master-data/level-teacher', component: MasterDataLevelTeacher },
  { path: '/master-data/tools', component: MasterDataTools },

  { path: '/404', component: Error },

  //TEST
  { path: '/test', component: Test },

  //Sementara Auth Teacher
  { path: '/master-data-1', component: MasterData1 },
  { path: '/master-data-2', component: MasterData2 },
  { path: '/master-data-3', component: MasterData3 },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
