<template>
  <fm-generate-form
    :data="jsonData"
    :remote="remoteFuncs"
    :value="values"
    ref="generateForm"
  >
  </fm-generate-form>
</template>

<script>
export default {
  data() {
    return {
      jsonData: {
        list: [{
          type: "date",
          name: "日期选择器",
          icon: "icon-date",
          options: {
            defaultValue: "",
            readonly: false,
            disabled: false,
            editable: true,
            clearable: true,
            placeholder: "",
            startPlaceholder: "",
            endPlaceholder: "",
            type: "date",
            format: "yyyy-MM-dd",
            timestamp: false,
            required: false,
            width: "",
            remoteFunc: "func_1558405249000_18988"
          },
          key: "1558405249000_18988",
          model: "date_1558405249000_18988",
          rules: []
        }, {
          type: "rate",
          name: "评分",
          icon: "icon-icon-test",
          options: {
            defaultValue: 0,
            max: 5,
            disabled: false,
            allowHalf: false,
            required: false,
            remoteFunc: "func_1558405250000_93358"
          },
          key: "1558405250000_93358",
          model: "rate_1558405250000_93358",
          rules: []
        }],
        config: {
          labelWidth: 100,
          labelPosition: "top",
          size: "small"
        }
      }, values: {},
      remoteFuncs: {},
    }
  }
}
</script>
