import Icon from 'scripts/components/basic/Icon.vue';
import Modal from 'scripts/components/basic/Modal.vue';
import Tab from 'scripts/components/basic/Tab.vue';
import Tabs from 'scripts/components/basic/Tabs.vue';
import Accordion from 'scripts/components/basic/Accordion.vue';
import AccordionGroup from 'scripts/components/basic/AccordionGroup.vue';
import Toast from 'scripts/components/basic/Toast.vue';
import Carousel from 'scripts/components/basic/Carousel.vue';
import Slide from 'scripts/components/basic/Slide.vue';

import IconButton from 'scripts/components/buttons/IconButton.vue';
import IconLink from 'scripts/components/buttons/IconLink.vue';
import PrimaryButton from 'scripts/components/buttons/PrimaryButton.vue';
import SubmitButton from 'scripts/components/buttons/SubmitButton.vue';
import LinkButton from 'scripts/components/buttons/LinkButton.vue';

import Cart from 'scripts/components/cart/Cart.vue';
import Sidecart from 'scripts/components/cart/Sidecart.vue';
import Navbar from 'scripts/components/navigation/Navbar.vue';
import SearchResults from 'scripts/components/product/SearchResults.vue';
import ProductTile from 'scripts/components/product/ProductTile.vue';
import ProductDisplay from 'scripts/components/product/ProductDisplay.vue';
import ProductBottomline from 'scripts/components/product/ProductBottomline.vue';
import CollectionGrid from 'scripts/components/collection/CollectionGrid.vue';
import VideoCarousel from 'scripts/components/video/VideoCarousel.vue';
import VideoModal from 'scripts/components/video/VideoModal.vue';

import AccountLogin from 'scripts/components/account/AccountLogin.vue';
import AccountForgotPassword from 'scripts/components/account/AccountForgotPassword.vue';
import AccountRegister from 'scripts/components/account/AccountRegister.vue';
import AccountNav from 'scripts/components/account/AccountNav.vue';
import AccountSavedAddress from 'scripts/components/account/AccountSavedAddress.vue';
import AccountNewAddress from 'scripts/components/account/AccountNewAddress.vue';
import AccountSelectNav from 'scripts/components/account/AccountSelectNav.vue';

import HeroComponent from 'scripts/components/HeroComponent.vue'

/**
 * Deferred components
 *
 * These components will only load if they are rendered by markup. Use
 * for components that don't load on every page.
 *
 * i.e. below the fold components, landing page components, etc.
 */
// const AsyncComponent = () => import('scripts/components/category/AsyncComponent.vue')

export default {
  Icon,
  Modal,
  Tab,
  Tabs,
  Accordion,
  AccordionGroup,
  Toast,
  Carousel,
  Slide,
  IconButton,
  IconLink,
  PrimaryButton,
  SubmitButton,
  LinkButton,
  Cart,
  Sidecart,
  Navbar,
  SearchResults,
  ProductTile,
  ProductDisplay,
  ProductBottomline,
  CollectionGrid,
  VideoCarousel,
  VideoModal,
  AccountLogin,
  AccountForgotPassword,
  AccountRegister,
  AccountNav,
  AccountNewAddress,
  AccountSavedAddress,
  AccountSelectNav,
  HeroComponent
};
