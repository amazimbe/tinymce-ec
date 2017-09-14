const plugin = (editor) => {
  editor.addButton('ec', {
    tooltip: 'Experimental condition',
    icon: 'ec',
    onclick() {
      let window = editor.windowManager.open({
        height: 112,
        width: 460,
        title: 'Insert timer',

        buttons: [{
          text: 'Ok',
          classes: 'widget btn primary',
          onclick() {
            window.submit();
          }
        }, {
          text: 'Cancel',
          onclick() {
            window.close();
          }
        }],

        body: [{
          type: 'textbox',
          name: 'time',
          label: 'Select duration'
        }],

        onsubmit(e) {
          let html = `<span class="widget ec" data-timer="${e.data.time}">${e.data.time}</span>&nbsp;`;
          editor.insertContent(html);
        }
      });

      let modal = $('#' + window._id),
        input = $(modal.find('input.mce-textbox').get(0));

      input.timepicker({
        showSeconds: true,
        minuteStep: 1,
        secondStep: 1,
        showMeridian: false,
        defaultTime: '00:00:00'
      });

      input.focus(e => {
        $(e.target).timepicker('showWidget');
      });

      input.timepicker('showWidget');
    }
  });
};

export default plugin;
