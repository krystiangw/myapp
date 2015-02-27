<script>

var element = document.getElementById('imageUploadStudent')
element.type="filepicker-dragdrop";
element.onchange = function(e){
    console.log(e);
};

</script>