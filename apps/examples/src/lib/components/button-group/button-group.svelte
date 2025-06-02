<script>
    import { ButtonGroup, Button } from "svelte-polaris";

    function handleSave() {
        console.log("Save clicked");
    }

    function handleCancel() {
        console.log("Cancel clicked");
    }
</script>

<ButtonGroup gap="tight">
    <Button onClick={handleCancel}>Cancel</Button>
    <Button variant="primary" onClick={handleSave}>Save</Button>
</ButtonGroup>
