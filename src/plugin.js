import Widget from './widget';

const plugin = (editor) => {
  const widget = new Widget({
    editor: editor,
    elementClass: 'ec',
    html: '<span class="widget {{elementClass}}">{{selection}}</span>',

    default: (html) => {
      let window = editor.windowManager.open({
        height: 112,
        width: 460,
        title: 'Insert timer',

        buttons: [{
          text: 'Ok',
          classes: 'widget btn primary',
          onclick: () => {
            window.submit();
          }
        }, {
          text: 'Cancel',
          onclick: () => {
            window.close();
          }
        }],

        body: [{
          type: 'textbox',
          name: 'time',
          label: 'Select duration'
        }],

        onsubmit: function(e) {
          let value = e.data.time;
          html = "<span class='widget ec' data-timer='{{selection}}'>{{selection}}</span>";
          html = html.replace(new RegExp('{{selection}}', 'g'), value) + '&nbsp;';
          editor.insertContent(html);
        }
      });

      let modal = $('#' + window._id);
      let input = $(modal.find('input.mce-textbox').get(0));

      input.timepicker({
        showSeconds: true,
        minuteStep: 1,
        secondStep: 1,
        showMeridian: false,
        defaultTime: '00:00:00'
      });

      input.focus(e => {
        return $(e.target).timepicker('showWidget');
      });

      input.timepicker('showWidget');
    }
  });

  editor.addButton('ec', {
    tooltip: 'Experimental condition',
    icon: 'ec',
    text: 'ec',
    onclick: () => {
      widget.insertContent();
    }
  });
};

export default plugin;
