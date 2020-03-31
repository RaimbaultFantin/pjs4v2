package com.example.application;

import android.content.Intent;
import android.os.Bundle;

import com.github.nkzawa.emitter.Emitter;
import com.github.nkzawa.socketio.client.IO;
import com.github.nkzawa.socketio.client.Socket;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.snackbar.Snackbar;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.Toast;

import org.json.JSONException;
import org.json.JSONObject;

import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

public class ChatActivity extends AppCompatActivity {

    private static Utilisateur user;
    private Button btnEnvoyer;
    private EditText txtMessage;

    private Socket socket;
    private boolean connecte = false;

    private ListView messageListView;
    private MessageAdapter messageAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chat);

        Intent i = getIntent();
        user = (Utilisateur) i.getSerializableExtra("user");

        if(savedInstanceState != null){
            connecte = savedInstanceState.getBoolean("hasConnection");
        }

        if(!connecte) {
            try {
                socket = IO.socket("http://localhost:5001");
            } catch (URISyntaxException e) {
                e.printStackTrace();
            }

            socket.connect();
            socket.on("message", message);

            connecte = true;
        }

        txtMessage = findViewById(R.id.txtMessage);
        btnEnvoyer = findViewById(R.id.btnEnvoyer);
        messageListView = findViewById(R.id.listMessages);

        List<Message> messages = new ArrayList<>();
        messageAdapter = new MessageAdapter(this, R.layout.autre_message, messages);
        messageListView.setAdapter(messageAdapter);

        btnEnvoyer.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String message = txtMessage.getText().toString();

                if(TextUtils.isEmpty(message.trim()))
                    socket.emit("message",user.getId(),user.getIdEquipe(),message);
                else
                    Toast.makeText(getApplicationContext(),"Message vide !",Toast.LENGTH_SHORT);
            }
        });

    }

    Emitter.Listener message = new Emitter.Listener() {
        @Override
        public void call(final Object... args) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    JSONObject data = (JSONObject) args[0];
                    String username;
                    String message;
                    String id;

                    try {
                        username = data.getString("username");
                        message = data.getString("message");
                        id = data.getString("id");

                        Message msg = new Message(id, username, message);
                        messageAdapter.add(msg);

                    } catch (Exception e) {
                        return;
                    }
                }
            });

        }
    };

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        outState.putBoolean("connecte", connecte);
    }

    public Utilisateur getUser() {
        return user;
    }

}
