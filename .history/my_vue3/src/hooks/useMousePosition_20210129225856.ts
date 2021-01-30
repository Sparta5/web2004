import { ref, onMounted, onUnmounted } from 'vue'
function useMounsePosition() {
  // 鼠标追踪
  const x = ref(0);
  const y = ref(0);
  const updateMouse = (e: MouseEvent) => {
    x.value = e.pageX;
    y.value = e.pageY;
  };
  onMounted(() => {
    document.addEventListener("click", updateMouse);
  });
  onUnmounted(() => {
    document.removeEventListener("click", updateMouse);
  });
  return { x, y }
}
export default useMouseTracker