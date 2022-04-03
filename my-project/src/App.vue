<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>{{ count }}</h1>
    <h1>{{ double }}</h1>
    <h1>{{ error }}</h1>
    <h1>{{ greetings }}</h1>
    <Suspense>
      <template #default>
        <div>
          <AsyncShow />
          <DogShow />
        </div>
      </template>
      <template #fallback>
        <h1>loading!...</h1>
      </template>
    </Suspense>
    <h1 v-if="loading">加载中。。。</h1>
    <img v-if="loaded" :src="result[0].url" alt="" srcset="" />
    <h1>X:{{ x }},Y:{{ y }}</h1>
    <button @click="openModal">Open Modal</button><br />
    <Modal :isOpen="modalIsOpe" @close-modal="onModalClose">My modal</Modal>
    <ul>
      <li class="list" v-for="number in numbers" :key="number">{{ number }}</li>
    </ul>
    <h1>{{ person.name }}</h1>
    <button @click="increase">👍＋</button><br />
    <button @click="updateGreeting">hello</button>
  </div>
</template>

<script lang="ts">
import { ref, computed, reactive, toRefs, watch, onErrorCaptured } from "vue";
import useMousePosition from "./hooks/useMousePositon";
import useURLLoader from "./hooks/useURLLoader";
import Modal from "./components/modal.vue";
import AsyncShow from "./components/AsyncShow.vue";
import DogShow from "./components/DogShow.vue";
interface DataProps {
  count: number;
  double: number;
  increase: () => void;
  numbers: number[];
  person: { name?: string };
}
interface DogResult {
  message: string;
  status: string;
}
interface CatResult {
  id: string;
  url: string;
  width: number;
  height: number;
}
export default {
  name: "App",
  components: {
    Modal,
    AsyncShow,
    DogShow,
  },
  setup() {
    const error = ref(null);
    onErrorCaptured((e: any) => {
      error.value = e;
      console.log("err", error.value);
      return true;
    });
    const data: DataProps = reactive({
      count: 0,
      increase: () => {
        data.count++;
      },
      double: computed(() => data.count * 2),
      numbers: [1, 2, 3],
      person: {},
    });
    data.numbers[0] = 5;
    data.person.name = "viking";

    const { x, y } = useMousePosition();
    const { result, loading, loaded } = useURLLoader<CatResult[]>(
      // "https://dog.ceo/api/breeds/image/random"
      "https://api.thecatapi.com/v1/images/search?limit=1"
    );
    watch(result, () => {
      if (result.value) {
        console.log("value", result.value[0].url);
      }
    });

    const greetings = ref("");
    const updateGreeting = () => {
      greetings.value += "Hello";
    };
    watch([greetings, () => data.count], (newValue, oldValue) => {
      console.log("new", newValue);
      console.log("old", oldValue);
      document.title = "updated" + data.count + greetings.value;
    });
    const refData = toRefs(data);
    console.log(refData, "sfsdf");
    const modalIsOpe = ref(false);
    const openModal = () => {
      modalIsOpe.value = true;
    };
    const onModalClose = () => {
      modalIsOpe.value = false;
    };

    return {
      ...refData,
      greetings,
      updateGreeting,
      x,
      y,
      result,
      loading,
      loaded,
      modalIsOpe,
      openModal,
      onModalClose,
      error,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
